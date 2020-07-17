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

    mountTo(parent) {
        parent.appendChild(this.root);
        for (const child of this.children) {
            child.mountTo(this.root)
        }
    }
}

class MyComponent {
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
        this.slot = <div></div>

        for (const child of this.children) {
            this.slot.appendChild(child)
        }

        this.render().mountTo(parent)
    }

    render() {
        return <article>
            <h1>{this.attributes.get('title')}</h1>
            <header>This is header</header>
            {this.slot}
            <footer>This is footer</footer>
        </article>
    }
}

/*
let component = <MyComponent id='a' class='b' style='width:100;height:100;background:green'>
        <MyComponent></MyComponent>
        <MyComponent></MyComponent>
        <MyComponent></MyComponent>
    </MyComponent>
*/

let component = <MyComponent id='a' class='b' style='width:100;height:100;background:green' title='this is title'>
        <div>Text Text Text</div>
    </MyComponent>

component.mountTo(document.body)