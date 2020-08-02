import { enableGesture } from "./gesture/gesture";

export function createElement(Cls, attributes, ...children) {
    let element;

    if (typeof Cls === 'string') {
        element = new Wrapper(Cls);
    } else {
        element = new Cls({timer: {}});
    }

    for (const name in attributes) {
        element.setAttribute(name, attributes[name])
    }

    function navigate(children) {
        for (const child of children) {
            if (child instanceof Array) {
                navigate(child, element);
                continue;
            }
    
            if (typeof child === 'string') {
                child = new Text(child);
            }
    
            element.appendChild(child);
        }
    }

    navigate(children);

    return element;
}

export class Text {
    constructor(text) {
        this.children = [];
        this.root = document.createTextNode(text);
    }

    mountTo(parent) {
        parent.appendChild(this.root)
    }
}

export class Wrapper {
    constructor(type) {
        this.children = [];
        this.root = document.createElement(type);
    }

    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    
        // parse any onEvent and event name
        if (name.match(/^on([\s\S]+)$/)) {
            // get name as lower case
            const eventName = RegExp.$1.toLowerCase();
            this.addEventListener(eventName, value);
            console.log('eventName', eventName)
        }

        // evoke enableGesture when value is true
        if (name === 'enableGesture' && value) {
            enableGesture(this.root)
        }
    }

    addEventListener() {
        this.root.addEventListener(...arguments);
    }

    removeEventListener() {
        this.root.removeEventListener(...arguments);
    }

    get style() {
        return this.root.style;
    }

    appendChild(child) {
        this.children.push(child)
    }

    mountTo(parent) {
        parent.appendChild(this.root);
        for (const child of this.children) {
            if (typeof child === 'string') {
                child = new Text(child);
            }
            child.mountTo(this.root);
        }
    }
}