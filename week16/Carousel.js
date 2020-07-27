import { createElement, Wrapper, Text } from './createElement';
import { Animation, Timeline } from './animation/animation';
import { ease } from './animation/cubicBezier';
import { enableGesture } from './gesture/gesture';

export default class MyCarousel {
    constructor(config) {
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
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
        let position = 0;

        let timeline = new Timeline;
        timeline.start();

        let nextPicStopHandler = null;

        let children = this.data.map((url, currentPosition) => {
            let onStart = () => {
                timeline.pause();
                clearTimeout(nextPicStopHandler);
            }

            let onPan = (event) => {
                let lastPosition = (currentPosition - 1 + this.data.length) % this.data.length;
                let nextPosition = (currentPosition - 1 + this.data.length) ;

                let lastElement = children[lastPosition];
                let currentElement = children[currentPosition];
                let nextElement = children[nextPosition];
            }


            let element = <img src={url} onStart={onStart} enableGesture={enableGesture} />;
            element.addEventListener('dragstart', e => e.preventDefault());
            return element;
        });

        let nextPicture = (params) => {
            let nextPosition = (position + 1) % this.data.length;

            let current = children[position];
            let next = children[nextPosition];

            let currentAnimation = new Animation(current.style, 'transform', v=>`translate(${5 * v}px)`, - 100 * position, - 100 - 100 * position, 500, 0, ease)
            let nextAnimation = new Animation(next.style, 'transform', v=>`translate(${5 * v}px)`, 100 - 100 * nextPosition, - 100 * nextPosition, 500, 0, ease)
            
            timeline.add(currentAnimation);
            timeline.add(nextAnimation);

            position = nextPosition;

            nextPicStopHandler = setTimeout(nextPicture, 3000);
        };

        setTimeout(nextPicture, 3000);
    }

    addMouseEvent(root, children) {
        let position = 0;

        root.addEventListener("mousedown", event => {
            let startX = event.clientX;
            let startY = event.clientY;

            let nextPosition = (position + 1) % this.data.length
            let lastPosition = (position - 1 + this.data.length) % this.data.length

            let current = children[position];
            let last = children[lastPosition];
            let next = children[nextPosition];

            // stop animation
            current.style.transition = 'ease 0s'
            last.style.transition = 'ease 0s'
            next.style.transition = 'ease 0s'

            current.style.transform = `translateX(${- 500 * position}px)`
            last.style.transform = `translateX(${- 500 - 500 * lastPosition}px)`
            next.style.transform = `translateX(${500 - 500 * nextPosition}px)`

            let move = event => {
                current.style.transform = `translateX(${event.clientX - startX - 500 * position}px)`
                last.style.transform = `translateX(${event.clientX - startX - 500 - 500 * lastPosition}px)`
                next.style.transform = `translateX(${event.clientX - startX + 500 - 500 * nextPosition}px)`
            };

            let up = event => {
                let offset = 0;

                if (event.clientX - startX > 250) {
                    offset = 1;
                } else if (event.clientX - startX < -250) {
                    offset = -1;
                }

                // re-open animation
                current.style.transition = 'ease 0.5s'
                last.style.transition = 'ease 0.5s'
                next.style.transition = 'ease 0.5s'

                current.style.transform = `translateX(${ offset * 500 - 500 * position}px)`
                last.style.transform = `translateX(${ offset * 500 - 500 - 500 * lastPosition}px)`
                next.style.transform = `translateX(${ offset * 500 + 500 - 500 * nextPosition}px)`

                position = (position - offset + this.data.length) % this.data.length;

                document.removeEventListener("mousemove", move);
                document.removeEventListener("mouseup", up);
            };

            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", up);
        })
    }

    render() {
        let children = this.data.map((url) => {
            let element = <img src={url} onStart={()=> timeline.pause()} enableGesture={enableGesture} />;
            element.addEventListener('dragstart', e => e.preventDefault());
            return element;
        });

        let root = <div class='carousel'>{ children }</div>;

        this.triggerAnimation(children);
        this.addMouseEvent(root, children);
        
        return root;
    }
}