const RENDER_TO_DOM = Symbol('render to dom');
const RE_RENDER_TO_DOM = Symbol('reRender to dom');

function replaceContent(range, node) {
    range.insertNode(node);
    // move range position after node position
    range.setStartAfter(node);
    range.deleteContents();

    range.setStartBefore(node);
    range.setEndAfter(node);
}

export class Component {
    constructor() {
        this.props = Object.create(null);
        this.children = [];
        this._root = null;
        this._range = null;
    }

    setAttribute(name, value) {
        this.props[name] = value;
    }

    appendChild(component) {
        this.children.push(component);
    }

    get vDom() {
        return this.render().vDom;
    }

    [RENDER_TO_DOM](range) {
        this._range = range;

        // cache old vDom for comparing
        this._vDomPrev = this.vDom;
        this._vDomPrev[RENDER_TO_DOM](range);
    }

    update() {
        let isSameNode = (oldNode, newNode) => {
            // compare type
            if (oldNode.type !== newNode.type) {
                return false;
            }

            // compare props value
            for (const name in newNode.props) {
                if (newNode.props[name] !== oldNode.props[name]) {
                    return false;
                }
            }

            // compare props count
            if (Object.keys(oldNode.props).length > Object.keys(newNode.props).length) {
                return false;
            }

            // if type is #text, need to compare text content
            if (newNode.type === '#text') {
                if (newNode.content !== oldNode.content) {
                    return false;
                }
            }

            return true;
        }

        let update = (oldNode, newNode) => {
            // check node first
            if (!isSameNode(oldNode, newNode)) {
                // replace old node with new node
                newNode[RENDER_TO_DOM](oldNode._range);
                return;
            }

            // if new node is the same as old node
            // just assign the same range as old node
            newNode._range = oldNode._range;

            const newChildrenDom = newNode.vChildrenDom;
            const oldChildrenDom = oldNode.vChildrenDom;

            if (!newChildrenDom || !newChildrenDom.length) {
                return;
            }

            // cache last range of old dom tree in case new dom tree is larger
            let tailRange = oldChildrenDom[oldChildrenDom.length - 1]._range;

            for (let i = 0; i < newChildrenDom.length; i++) {
                const newChild = newChildrenDom[i];
                const oldChild = oldChildrenDom[i];

                if (i < oldChildrenDom.length) {
                    update(oldChild, newChild);
                } else {
                    let range = document.createRange();
                    range.setStart(tailRange.endContainer, tailRange.endOffset);
                    range.setEnd(tailRange.endContainer, tailRange.endOffset);

                    // insert new node to the end of old node
                    newChild[RENDER_TO_DOM](range);
                    // update last range
                    tailRange = range;
                }
            }

        }

        // cache new dom
        let vDom = this.vDom;
        // update vDom tree
        update(this._vDomPrev, vDom);
        // replace old dom with new dom
        this._vDomPrev = vDom;
    }

    /*
    [RE_RENDER_TO_DOM]() {
        let oldRange = this._range;

        // need to create range in order to avoid bugs of range cleaning
        let range = document.createRange();
        range.setStart(oldRange.startContainer, oldRange.startOffset);
        range.setEnd(oldRange.startContainer, oldRange.startOffset);
        this[RENDER_TO_DOM](range);

        // This will only leave newly inserted empty range
        oldRange.setStart(range.endContainer, range.endOffset);
        oldRange.deleteContents();
    }
    */

    setState(newState) {
        if (this.state === null || typeof this.state !== 'object') {
            this.state = newState;
            this[RE_RENDER_TO_DOM]();

            return;
        }

        let merge = (oldState, newState) => {
            for (const p in newState) {
                if (oldState[p] === null || typeof oldState[p] !== 'object') {
                    oldState[p] = newState[p];
                } else {
                    merge(oldState[p], newState[p]);
                }
            }
        }

        merge(this.state, newState);
        this.update();
    }
}

class ElementWrapper extends Component {
    constructor(type) {
        super(type);
        this.type = type;
        // this.root = document.createElement(type);
    }

    /*
    setAttribute(name, value) {
        if (name.match(/^on([\s\S]+)$/)) {
            this.root.addEventListener(RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase()), value);
        } else {
            if (name === 'className') {
                this.root.setAttribute('class', value);
            } else {
                this.root.setAttribute(name, value);
            }
        }
    }

    appendChild(component) {
        let range = document.createRange();
        range.setStart(this.root, this.root.childNodes.length);
        range.setEnd(this.root, this.root.childNodes.length);
        component[RENDER_TO_DOM](range);
    }
    */

    get vDom() {
        this.vChildrenDom = this.children.map( child => child.vDom );
        return this;
        /*
        return {
            type: this.type,
            props: this.props,
            children: this.children.map( child => child.dom )
        }
        */
    }

    [RENDER_TO_DOM](range) {
        // cache range
        this._range = range;
        
        let root = document.createElement(this.type);

        // Add attribute
        // Note: React actually store and manage all events to prevent extra rendering tree (events are not related to rendering)
        for (const name in this.props) {
            const value = this.props[name];
            if (name.match(/^on([\s\S]+)$/)) {
                root.addEventListener(RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase()), value);
            } else {
                if (name === 'className') {
                    root.setAttribute('class', value);
                } else {
                    root.setAttribute(name, value);
                }
            }
        }

        if (!this.vChildrenDom) {
            this.vChildrenDom = this.children.map(child => child.vDom);
        }

        // Insert children vDom
        for (const child of this.vChildrenDom) {
            let childRange = document.createRange();
            childRange.setStart(root, root.childNodes.length);
            childRange.setEnd(root, root.childNodes.length);
            child[RENDER_TO_DOM](childRange);
        }

        replaceContent(range, root);
    }
}

class TextWrapper extends Component {
    constructor(content) {
        super(content);
        this.type = '#text';
        this.content = content;
    }

    get vDom() {
        return this;
        /*
        return {
            type: '#text',
            content: this.content,
        }
        */
    }

    [RENDER_TO_DOM](range) {
        this._range = range;

        const root = document.createTextNode(this.content);
        replaceContent(range, root);
    }
}

export function createElement(type, attributes, ...children) {
    let e;

    if (typeof type === 'string') {
        e = new ElementWrapper(type);
    } else {
        e = new type;
    }

    // convert JSX to dom operations
    for (const p in attributes) {
        e.setAttribute(p, attributes[p]);
    }

    const insertChildren = (children) => {
        for (const child of children) {
            if (typeof child === 'string') {
                child = new TextWrapper(child);
            }

            if (child === null) {
                continue;
            }
    
            if (typeof child === 'object' && child instanceof Array) {
                insertChildren(child);
            } else {
                e.appendChild(child);
            }
        }
    }
    insertChildren(children);
    
    return e;
}

export function render(component, parentElement) {
    let range = document.createRange();
    range.setStart(parentElement, 0);
    range.setEnd(parentElement, parentElement.childNodes.length);
    range.deleteContents();
    component[RENDER_TO_DOM](range);
}