function match(selector, element) {
    if (!selector || !element.attributes) {
        return false;
    }

    if (selector.charAt(0) === '#') {
        let attr = element.attributes.filter(attr => attr.name === 'id')[0];
        if (attr && attr.value === selector.replace('#', '')) {
            return true;
        }
    } else if (selector.charAt(0) === '.') {
        let attr = element.attributes.filter(attr => attr.name === 'class')[0];
        if (attr && attr.value === selector.replace('.', '')) {
            return true;
        }
    } else {
        if (element.tagName === selector) {
            return true;
        }
    }
}

// test
const element = {
    attributes: [
        {
            name: 'id',
            value: 'id',
        },
        {
            name: 'class',
            value: 'class',
        }
    ],
    tagName: 'div',
}
match("div #id.class", document.getElementById("id"));