import { createElement, Wrapper, Text } from './createElement';

class MyCarousel {
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

        let nextPicture = (params) => {
            let nextPosition = (position + 1) % this.data.length;

            let current = children[position];
            let next = children[nextPosition];

            // animation
            current.style.transition = 'ease 0s'
            next.style.transition = 'ease 0s'

            // start position
            current.style.transform = `translateX(${- 100 * position}%)`
            next.style.transform = `translateX(${100 - 100 * nextPosition}%)`

            setTimeout(() => {
                // animation
                current.style.transition = 'ease 0.5s'
                next.style.transition = 'ease 0.5s'

                // end position
                current.style.transform = `translateX(${- 100 - 100 * position}%)`
                next.style.transform = `translateX(${- 100 * nextPosition}%)`

                position = nextPosition;
            }, 1000 / 64)

            setTimeout(nextPicture, 3000);
        };

        // setTimeout(nextPicture, 3000);
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
            let element = <img src={url} />;
            element.addEventListener('dragstart', e => e.preventDefault());
            return element;
        });

        let root = <div class='carousel'>{ children }</div>;

        this.triggerAnimation(children);
        this.addMouseEvent(root, children);
        
        return root;
    }
}

let data = [
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
];

let component = <MyCarousel data={data} />

component.mountTo(document.body)