var page = require('webpage').create();
page.open('', (status) => {
    console.log('status', status)
    if (status === 'success') {
        var body = page.evaluate(() => {
            var toString = (pad, element) => {
                var children = element.childNodes;
                var childrenString = '';
                for (let i = 0; i < children.length; i++) {
                    childrenString += toString(' '+ pad, children[i]) + '\n';
                }
                var name;
                if (element.nodeType === Node.TEXT_NODE) {
                    name = '#text ' + JSON.stringify(element.textContent);
                }
                if (element.nodeType === Node.ELEMENT_NODE) {
                    name = element.tagName
                }
                return pad + name + (childrenString ? '\n' + childrenString : '')
            }

            return toString('', document.body);
        })
        console.log(body)
    }
    phantom.exit();
})