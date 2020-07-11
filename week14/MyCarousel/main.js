function createElement(Cls, attributes, ...children) {
    let o;

    if (typeof Cls === 'string') {
        o = new Wrapper(Cls);
    } else {
        o = new Cls({timer: {}});
    }

    for (const name in attributes) {
        // o[name] = attributes[name]
        o.setAttribute(name, attributes[name])
    }

    for (const child of children) {
        if (typeof child === 'string') {
            child = new Text(child);
        }

        o.appendChild(child)
    }

    return o;
}

class Text {
    constructor(text) {
        this.children = [];
        this.root = document.createTextNode(text);
    }

    mountTo(parent) {
        parent.appendChild(this.root)
    }
}

class Wrapper {
    constructor(type) {
        this.children = [];
        this.root = document.createElement(type);
    }

    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }

    appendChild(child) {
        this.children.push(child)
    }

    addEventListener(type, handler, config) {
        this.root.addEventListener(...arguments)
    }

    mountTo(parent) {
        parent.appendChild(this.root);
        for (const child of this.children) {
            child.mountTo(this.root)
        }
    }
}

class MyCarousel {
    constructor(config) {
        this.children = [];
        this.attributes = new Map();
    }

    setAttribute(name, value) {
        this.attributes.set(name, value);
    }

    appendChild(child) {
        this.children.push(child)
    }

    mountTo(parent) {
        this.render().mountTo(parent)
    }

    render() {
        return <div>
            {
                this.data.map((url) => {
                    let element = <img src={url} />;

                })
            }
        </div>
    }
}

let component = <MyCarousel id='a' class='b' style='width:100;height:100;background:green' title='this is title'>
    </MyCarousel>

component.mountTo(document.body)