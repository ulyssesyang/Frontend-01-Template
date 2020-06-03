function match(selector, element) {
    if (!selector || !element.attributes) {
        return false;
    }

    let currentMatchString = initializeMatchString();

    for (let i = 0; i < selector.length; i++) {
        const pointer     = selector[i];
        const nextPointer = selector[i + 1];

        // check if pointer is empty space
        // skip if empty
        if (pointer === ' ') {
            continue;
        }

        // check if check string has initialize
        if (!currentMatchString.type) {
            // initialize type
            currentMatchString.type = ['#', '.'].includes(pointer) ? pointer : 'tagName';
            currentMatchString.value = ['#', '.'].includes(pointer) ? '' : pointer;
        } else {
            // add up check string
            currentMatchString.value = currentMatchString.value + pointer;
        }

        // check if match string is end
        if(i === selector.length - 1 || ['#', '.', ' '].includes(nextPointer)) {
            currentMatchString.end = true;
        }

        // start to match if pointer has scanned full match string
        if (currentMatchString.value && currentMatchString.end) {
            if (currentMatchString.type === '#') {
                let attr = element.attributes.filter(attr => attr.name === 'id')[0];
                if (attr && attr.value === currentMatchString.value) {
                    // if match, then just continue scanning the rest string
                    currentMatchString = initializeMatchString();
                    continue;
                }
            } else if (currentMatchString.type === '.') {
                let attr = element.attributes.filter(attr => attr.name === 'class')[0];
                if (attr && attr.value === currentMatchString.value) {
                    // if match, then just continue scanning the rest string
                    currentMatchString = initializeMatchString();
                    continue;
                }
            } else {
                if (element.tagName === currentMatchString.value) {
                    // if match, then just continue scanning the rest string
                    currentMatchString = initializeMatchString();
                    continue;
                }
            }

            // if not match, it means not match
            return false;
        }
    }

    // if scan all strings, means fully matching
    return true;
}

function initializeMatchString() {
    return {
        end: false,
        value: '',
        type: null,
    };
}

// test
const element = {
    attributes: [
        {
            name: 'id',
            value: 'id1',
        },
        {
            name: 'class',
            value: 'class1',
        }
    ],
    tagName: 'div',
}

console.log(match("div #id.class", element)); //false
console.log(match("div #id1.class1", element)); //true
console.log(match("div #id1.class2", element)); //false
console.log(match("div #id1", element)); //true