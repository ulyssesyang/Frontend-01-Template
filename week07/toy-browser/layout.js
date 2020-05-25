function getStyle(element) {

    if (!element.style) {
        element.style = {};
    }

    for (const prop in element.computedStyle) {

        const p = element.computedStyle.value;
        element.style[prop] = element.computedStyle[prop].value;

        // check value is px unit
        if (element.style[prop].toString().match(/px$/)) {
            element.style[prop] = parseInt(element.style[prop]);
        }

        // check value is number
        if (element.style[prop].toString().match(/^[0-9\.]+$/)) {
            element.style[prop] = parseInt(element.style[prop]);
        }
    }

    return element.style;
}


function layout(element) {

    if (!element.computedStyle) {
        return;
    }

    // prepare element style value
    const elementStyle = getStyle(element);

    // only process flex layout in this project
    if (elementStyle.display !== 'flex') {
        return;
    }

    // filter out any content node
    const items = element.children.filter(e => e.type === 'element');

    // order element
    items.sort((a, b) => {
        return (a.order || 0) - (b.order || 0);
    });

    const style = elementStyle;

    // prepare default style value
    ['width', 'height'].forEach(size => {
        if (style[size] === 'auto' || style[size] === '') {
            style[size] = null;
        }
    });

    if (!style.flexDirection || style.flexDirection === 'auto') {
        style.flexDirection = 'row';
    }

    if (!style.alignItems || style.alignItems === 'auto') {
        style.alignItems = 'stretch';
    }

    if (!style.justifyContent || style.justifyContent === 'auto') {
        style.justifyContent = 'flex-start';
    }

    if (!style.flexWrap || style.flexWrap === 'auto') {
        style.flexWrap = 'nowrap';
    }

    if (!style.alignContent || style.alignContent === 'auto') {
        style.alignContent = 'stretch';
    }

    // main Axis variables
    let mainSize, mainStart, mainEnd, mainSign, mainBase;
    // cross Axis variables
    let crossSize, crossStart, crossEnd, crossSign, crossBase;

    if (style.flexDirection === 'row') {

        mainSize = 'width';
        mainStart = 'left';
        mainEnd = 'right';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';

    }

    if (style.flexDirection === 'row-reverse') {

        mainSize = 'width';
        mainStart = 'right';
        mainEnd = 'left';
        mainSign = -1;
        mainBase = style.width;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';

    }

    if (style.flexDirection === 'column') {

        mainSize = 'height';
        mainStart = 'top';
        mainEnd = 'bottom';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';

    }

    if (style.flexDirection === 'column-reverse') {

        mainSize = 'height';
        mainStart = 'bottom';
        mainEnd = 'top';
        mainSign = -1;
        mainBase = style.height;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';

    }

    if (style.flexWrap === 'wrap-reverse') {

        let temp = crossStart;
        crossStart = crossEnd;
        crossEnd = temp;
        crossSign = -1;

    } else {

        crossSign = +1;
        crossBase = 0;

    }

    let isAutoMainSize = false;

    // auto sizing
    if (!style[mainSize]) {

        elementStyle[mainSize] = 0;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            // 对所以元素的mainSize，进行累加
            if (itemStyle[mainSize] !== null || itemStyle[mainSize] !== (void 0)) {
                elementStyle[mainSize] = elementStyle[mainSize] + itemStyle[mainSize];
            }
        }

        isAutoMainSize = true;
    }

    const flexLine = [];
    const flexLines = [flexLine];

    // main/cross axis 剩余空间
    let mainSpace = elementStyle[mainSize];
    let crossSpace = 0;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemStyle = getStyle(item);

        if (itemStyle[mainSize] === null) {
            itemStyle[mainSize] = 0;
        }

        if (itemStyle.flex) {
            flexLine.push(item);
        } else if (style.flexWrap === 'noWrap' && isAutoMainSize) {
            mainSpace = mainSpace - itemStyle[mainSize];
            if (itemStyle[crossSize] !== null && itemStyle[crossSize]) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSize])
            }
            flexLine.push(item);
        } else {
            // 当元素尺寸大于整行大小，直接把元素大小设为行大小
            if (itemStyle[mainSize] > style[mainSize]) {
                itemStyle[mainSize] = style[mainSize];
            }

            if (mainSpace < itemStyle[mainSize]) {
                flexLine.mainSpace = mainSpace;
                flexLine.crossSpace = crossSpace;
                flexLine = [item]; //???
                flexLines.push(flexLine);
                mainSpace = style[mainSize];
                crossSpace = 0;
            } else {
                flexLine.push(item);
            }

            if (itemStyle[crossSize] !== null && itemStyle[crossSize]) {
                crossSize = Math.max(crossSpace, itemStyle[crossSize]);
            }

            mainSpace = mainSpace - itemStyle[mainSize];
        }
    }

    flexLine.mainSpace = mainSpace;

    if (style.flexWrap === 'nowrap' || isAutoMainSize) {
        flexLine.crossSpace = (style[crossSize] !== undefined) ? style[crossSize] : crossSpace;
    } else {
        flexLine.crossSpace = crossSpace;
    }

    if (mainSpace < 0) {
        // overflow (only if container is single line), scale every item
        const scale = style[mainSize] / (style[mainSize] - mainSpace);
        let currentMain = mainBase;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const itemStyle = getStyle(item);

            if (itemStyle.flex) {
                itemStyle[mainSize] = 0;
            }

            itemStyle[mainSize] = itemStyle[mainSize] * scale;
            itemStyle[mainSize] = currentMain;
            itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
            currentMain = itemStyle[mainEnd];
        }
    } else {
        // process each flex line
        flexLines.forEach((items) => {
            const mainSpace = items.mainSpace;

            let flexTotal = 0;
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const itemStyle = getStyle(item);

                if ((itemStyle.flex !== null) && (itemStyle.flex !== (void 0))) {
                    flexTotal = flexTotal + itemStyle.flex;
                }
            }

            let currentMain;
            if (flexTotal > 0) {
                // there is flexible flex items
                currentMain = mainBase;
                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    const itemStyle = getStyle(item);

                    if (itemStyle.flex) {
                        itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex;
                    }

                    itemStyle[mainStart] = currentMain;
                    itemStyle[mainEnd]   = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
                    currentMain = itemStyle[mainEnd];
                }
            } else {
                // there is no flexible flex items, which means, justify-content should work
                let step;
                if (style.justifyContent === 'flex-start') {
                    currentMain = mainBase;
                    step = 0;
                }
                if (style.justifyContent === 'flex-end') {
                    currentMain = mainSpace * mainSign + mainBase;
                    step = 0;
                }
                if (style.justifyContent === 'center') {
                    currentMain = mainSpace / 2 * mainSign + mainBase;
                    step = 0;
                }
                if (style.justifyContent === 'space-between') {
                    step = mainSpace / (items.length - 1) * mainSign;
                    currentMain = mainBase;
                }
                if (style.justifyContent === 'space-around') {
                    step = mainSpace / items.length * mainSign;
                    currentMain = step / 2 + mainBase;
                }
                
                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    itemStyle[mainStart, currentMain];
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle * itemStyle[mainSize];
                    currentMain = itemStyle[mainEnd] + step;
                }
            }
        })
    }

    // compute cross Axis sizes
    // align-items, align-self
    if (!style[crossSize]) {
        crossSpace = 0;
        elementStyle[crossSize] = 0;
        for (let i = 0; i < flexLines.length; i++) {
            elementStyle[crossSize] = elementStyle[crossSize] + flexLines[i].crossSpace;
        }
    } else {
        crossSpace = style[crossSize];
        for (let i = 0; i < flexLines.length; i++) {
            crossSpace = crossSpace + flexLines[i].crossSpace;
        }
    }

    if (style.flexWrap === 'wrap-reverse') {
        crossBase = style[crossSize];
    } else {
        crossBase = 0;
    }

    let lineSize = style[crossSize] / flexLines.length;

    let step; // space between elements
    if (style.alignContent === 'flex-start') {
        crossBase = crossBase + 0;
        step = 0;
    }
    if (style.alignContent === 'flex-end') {
        crossBase = crossBase + crossSign * crossSpace;
        step = 0;
    }
    if (style.alignContent === 'center') {
        crossBase = crossBase + crossSign * crossSpace / 2;
        step = 0;
    }
    if (style.alignContent === 'space-between') {
        step = crossSpace / (flexLines.length - 1);
        crossBase = crossBase + 0;
    }
    if (style.alignContent === 'space-around') {
        step = crossSpace / (flexLines.length);
        crossBase = crossBase + crossSign * step / 2;
    }
    if (style.alignContent === 'stretch') {
        crossBase = crossBase + 0;
        step = 0;
    }

    flexLines.forEach((items) => {
        let lineCrossSize = style.alignContent === 'stretch' ? items.crossSpace + crossSpace / flexLines.length : items.crossSpace;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const itemStyle = getStyle(item);

            let align = itemStyle.alignSelf || style.alignItems;

            if (itemStyle[crossSize] === null) {
                itemStyle[crossSize] = (align === 'stretch') ? lineCrossSize : 0;
            }

            if (align === 'flex-start') {
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd]   = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
            }

            if (align === 'flex-end') {
                itemStyle[crossEnd]   = crossBase + crossSign * lineCrossSize;
                itemStyle[crossStart] = itemStyle[crossEnd] + crossSign * itemStyle[crossSize];
            }

            if (align === 'center') {
                itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]) / 2;
                itemStyle[crossEnd]   = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
            }

            if (align === 'stretch') {
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd]   = crossBase + crossSign * ( itemStyle[crossSize] !== null && itemStyle[crossSize] !== void 0 ? itemStyle[crossSize] : lineCrossSize );
                itemStyle[crossSize]  = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart]);
            }
        }

        crossBase = crossBase + crossSign * (lineCrossSize + step);
    });

    console.log(items);
}

module.exports = layout;