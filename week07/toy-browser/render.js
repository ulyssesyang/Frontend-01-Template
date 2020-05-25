const images = require('images');

function render(viewport, element) {
    if (element.style) {
        const img = images(element.style.width, element.style.height);

        if (element.style['background-color']) {
            let color = element.style['background-color'] || 'rgb(0,0,0)';
            let c = color.match(/rgb\((\d+),(\d+),(\d+)\)/);
            img.fill(Number(c[1]), Number(c[2]), Number(c[3]), 1);
            viewport.draw(img, element.style.left||0, element.style.top||0);
            console.log('draw element style: ', element.style);
        }
    }

    if (element.children) {
        for (const child of element.children) {
            render(viewport, child);
        }
    }
}

module.exports = render;