import { createElement, Wrapper, Text } from '../lib/createElement';
import { Animation, Timeline } from '../lib/animation';
import { ease } from '../lib/cubicBezier';

export default class ListView {
    constructor(config) {
        this.children   = [];
        this.attributes = new Map();
        this.properties = new Map();
        this.state      = Object.create(null);
    }

    setAttribute(name, value) {
        this[name] = value;
    }

    getAttribute(name) {
        return this[name];
    }

    appendChild(child) {
        this.children.push(child)
    }

    mountTo(parent) {
        this.render().mountTo(parent)
    }

    render() {
        let data = this.getAttribute('data');
        return <div class="list-view" style="width:300px;">
            {
                data.map(this.children[0])
            }
        </div>
    }
}