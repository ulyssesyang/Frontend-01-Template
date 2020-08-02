import { createElement, Wrapper, Text } from './createElement';
import { Animation, Timeline } from './animation/animation';
import { ease } from './animation/cubicBezier';

export default class Panel {
    constructor(config) {
        this.children        = [];
        this.attributes      = new Map();
        this.properties      = new Map();
    }

    setAttribute(name, value) {
        this[name] = value;
    }

    appendChild(child) {
        this.children.push(child)
    }

    mountTo(parent) {
        this.render().mountTo(parent)
    }

    render() {
        return <div class="panel" style="border:solid 1px lightgreen;width:300px">
            <hi style="background-color:lightgreen;width:300px;margin:0"></hi>
            <div style="width:300px;min-height:300px">
                { this.children.map(child => <div></div>) }
            </div>
        </div>
    }
}