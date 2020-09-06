import { createElement, Wrapper, Text } from '../lib/createElement';
import { Animation, Timeline } from '../lib/animation';
import { ease } from '../lib/cubicBezier';

export default class Panel {
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

    select(i) {
        for (const view of this.childViews) {
            view.style.display = 'none';
        }
        this.childViews[i].style.display = '';
        
        for (const view of this.titleViews) {
            view.classList.remove('selected');
        }
        this.titleViews[i].classList.add('selected');
    }

    render() {
        this.childViews = this.children.map(child => <div style="width:300px;min-height:300px">{child}</div>);
        this.titleViews = this.children.map((child, i) => {
            return <span style="background-color:lightgreen;width:300px;min-height:300px;margin:0 10px 0 0" onClick={()=> this.select(i)}>
                    {child.getAttribute('title') || ''}
                </span>
        });
        
        setTimeout(() => this.select(0),16);

        return <div class="panel" style="margin: 2rem auto;width:300px">
            <hi style="width:300px;margin:0">{this.titleViews}</hi>
            <div style="border:solid 1px lightgreen">
                { this.childViews }
            </div>
        </div>
    }
}