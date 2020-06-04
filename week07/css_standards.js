const lis = document.getElementById('container').children;
const standards = [];

for (const li of lis) {
    if (li.getAttribute('data-tag').match(/css/)) {
        standards.push({
            name: li.children[1].innerText,
            url: li.children[1].children[0].href
        })
    }
}

console.log(standards);

const iframe = document.createElement('iframe');
document.body.innerHTML = '';
document.body.appendChild(iframe);

function happen(element, event) {
    return new Promise(function (resolve) {
        let handler = () => {
            resolve();
            element.removeEventListener(event, handler);
        }
        element.addEventListener(event, handler);
    })
}

void async function() {
    for (const standard of standards) {
        iframe.src = standard.url;
        await happen(iframe, 'load');
    }
}();