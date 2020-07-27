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

    return element;
}

function navigate(children, element) {
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

        if (name === 'enableGesture') {
            value(this.root)
        }
    }

    addEventListener() {
        this.root.addEventListener(...arguments);
    }

    removeEventListener() {
        this.root.addEventListener(...arguments);
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
            child.mountTo(this.root)
        }
    }
}