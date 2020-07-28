import { createElement, Wrapper, Text } from './createElement';
import { Animation, Timeline } from './animation/animation';
import { ease } from './animation/cubicBezier';

export default class MyCarousel {
    constructor(config) {
        this.children        = [];
        this.attributes      = new Map();
        this.properties      = new Map();
        this.stopHandler     = null;
        this.timeline        = new Timeline;
        this.currentPosition = 0;
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

    triggerAnimation(children) {
        this.timeline.start();
        setTimeout(()=> this.startHandler(children), 3000);
    }

    startHandler(children) {
        let nextPosition    = (this.currentPosition + 1) % this.data.length;
        let currentElement  = children[this.currentPosition];
        let nextElement     = children[nextPosition];

        let currentAnimation = new Animation(currentElement.style, 'transform', v=>`translateX(${5 * v}px)`, - 100 * this.currentPosition, - 100 - 100 * this.currentPosition, 500, 0, ease)
        let nextAnimation    = new Animation(nextElement.style, 'transform', v=>`translateX(${5 * v}px)`, 100 - 100 * nextPosition, - 100 * nextPosition, 500, 0, ease)
        
        this.timeline.add(currentAnimation);
        this.timeline.add(nextAnimation);

        this.currentPosition = nextPosition;

        this.stopHandler = setTimeout(()=> this.startHandler(children), 3000);
    }

    render() {
        // data is passed through property
        let children = this.data.map((url) => {
            let lastPosition = (this.currentPosition - 1 + this.data.length) % this.data.length;
            let nextPosition = (this.currentPosition + 1) % this.data.length;
            let offset;

            const onStart = () => {
                this.timeline.pause();
                clearTimeout(this.stopHandler);

                const  currentElement     = children[this.currentPosition];
                const regexForTransform   = /translateX\(([\s\S]+)px\)/;
                let currentTransformValue = Number(currentElement.style.transform.match(regexForTransform)[1]);

                offset                = currentTransformValue + 500 * this.currentPosition;
            }

            const onPanMove = (event) => {
                const dx             = event.detail.clientX - event.detail.startX;
                const lastElement    = children[lastPosition];
                const currentElement = children[this.currentPosition];
                const nextElement    = children[nextPosition];
                
                let lastTransformValue    = - 500 - 500 * lastPosition + offset + dx;
                let currentTransformValue = - 500 * this.currentPosition + offset + dx;
                let nextTransformValue    = 500 - 500 * nextPosition + offset + dx;

                lastElement.style.transform    = `translateX(${lastTransformValue}px)`;
                currentElement.style.transform = `translateX(${currentTransformValue}px)`;
                nextElement.style.transform    = `translateX(${nextTransformValue}px)`;
            }

            const onPanEnd = (event) => {
                const dx             = event.detail.clientX - event.detail.startX;
                const lastElement    = children[lastPosition];
                const currentElement = children[this.currentPosition];
                const nextElement    = children[nextPosition];

                let direction;
                if (dx + offset > 250) {
                    direction = 1;
                } else {
                    direction = - 1;
                }

                this.timeline.reset();
                this.timeline.start();

                let lastTransformValue    = - 500 - 500 * lastPosition + offset + dx;
                let currentTransformValue = - 500 * this.currentPosition + offset + dx;
                let nextTransformValue    = 500 - 500 * nextPosition + offset + dx;

                let lastAnimation    = new Animation(lastElement.style, 'transform', v=>`translateX(${v}%)`, lastTransformValue, - 500 - 500 * lastPosition + direction * 500, 500, 0, ease);
                let currentAnimation = new Animation(currentElement.style, 'transform', v=>`translateX(${v}%)`, currentTransformValue, - 500 * this.currentPosition + direction * 500, 500, 0, ease);
                let nextAnimation    = new Animation(nextElement.style, 'transform', v=>`translateX(${v}%)`, nextTransformValue, 500 - 500 * nextPosition + direction * 500, 500, 0, ease);

                this.timeline.add(lastAnimation);
                this.timeline.add(currentAnimation);
                this.timeline.add(nextAnimation);

                this.currentPosition = (this.currentPosition - direction + this.data.length) % this.data.length;

                this.stopHandler = setTimeout(()=> this.startHandler(children), 3000);
            }

            let element = <img src={url} onStart={onStart} onPanMove={onPanMove} onPanEnd={onPanEnd} enableGesture={true} />;
            element.style.transform = 'translateX(0px)';
            element.addEventListener('dragstart', e => e.preventDefault());

            return element;
        });

        console.log('children', children)

        let root = <div class='carousel'>{ children }</div>;

        this.triggerAnimation(children);
        
        return root;
    }
}