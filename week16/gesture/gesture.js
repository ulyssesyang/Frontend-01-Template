export function enableGesture(element) {
    let contexts = Object.create(null);

    let MOUSE_SYMBOL = Symbol('mouse');

    if (document.ontouchstart !== null) {
        console.log('pc mode')
        element.addEventListener('mousedown', (event) => {
            contexts[MOUSE_SYMBOL] = Object.create(null);

            start(event, contexts[MOUSE_SYMBOL]);

            let mousemove = (event) => {
                move(event, contexts[MOUSE_SYMBOL]);
            }

            let mouseend = (event) => {
                end(event, contexts[MOUSE_SYMBOL]);

                document.removeEventListener('mousemove', mousemove)
                document.removeEventListener('mouseup', mouseend)
            }

            document.addEventListener('mousemove', mousemove);
            document.addEventListener('mouseup', mouseend);
        })
    }

    element.addEventListener('touchstart', (event) => {
        for (const touch of event.changedTouches) {
            contexts[touch.identifier] = Object.create(null);
            start(touch, contexts[touch.identifier])
        }
    })

    element.addEventListener('touchmove', (event) => {
        for (const touch of event.changedTouches) {
            move(touch, contexts[touch.identifier])
        }
    })

    element.addEventListener('touchend', (event) => {
        for (const touch of event.changedTouches) {
            end(touch, contexts[touch.identifier])
            delete contexts[touch.identifier]
        }
    })

    element.addEventListener('touchcancel', (event) => {
        for (const touch of event.changedTouches) {
            cancel(touch, contexts[touch.identifier])
            delete contexts[touch.identifier]
        }
    })

    let start = (point, context) => {
        element.dispatchEvent(new CustomEvent('start', {
            detail: {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
            }
        }))

        context.startX = point.clientX;
        context.startY = point.clientY;
        context.moves = [];
        console.log('start', context)

        context.isTap = true;
        context.isPan = false;
        context.isPress = false;

        context.timeoutHandler = setTimeout(() => {
            if (context.isPan) {
                return;
            }

            context.isTap = false;
            context.isPan = false;
            context.isPress = true;

            console.log('press start')

            element.dispatchEvent(new CustomEvent('press-start', {}))
        }, 500)
    }

    let move = (point, context) => {
        let dx = point.clientX - context.startX;
        let dy = point.clientY - context.startY;
        console.log('move', dx, dy)

        if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
            if (context.isPress) {
                console.log('press cancel')
                element.dispatchEvent(new CustomEvent('press-cancel', {}))
            }

            context.isTap = false;
            context.isPan = true;
            context.isPress = false;
            console.log('pan start')

            element.dispatchEvent(new CustomEvent('pan-start', {
                detail: {
                    startX: context.startX,
                    startY: context.startY,
                    clientX: point.clientX,
                    clientY: point.clientY,
                }
            }))
        }

        if (context.isPan) {
            context.moves.push({
                dx,
                dy,
                t: Date.now()
            });

            // only cache recent 300ms actions
            context.moves = context.moves.filter(move => Date.now() - move.t < 300);

            console.log('pan move')
            element.dispatchEvent(new CustomEvent('pan-move', {
                detail: {
                    startX: context.startX,
                    startY: context.startY,
                    clientX: point.clientX,
                    clientY: point.clientY,
                }
            }))
        }
    }

    let end = (point, context) => {
        console.log('end', point.clientX, point.clientY)

        if (context.isPan) {
            console.log('pan end')

            let dx = point.clientX - context.startX;
            let dy = point.clientY - context.startY;
            let latestMove = context.moves[0];
            let speed = Math.sqrt(((latestMove.dx - dx) ** 2 + (latestMove.dy - dy) ** 2) / (Date.now() - latestMove.t));

            let isFlick = speed > 2.5;

            element.dispatchEvent(new CustomEvent('pan-end', {
                detail: {
                    startX: context.startX,
                    startY: context.startY,
                    clientX: point.clientX,
                    clientY: point.clientY,
                    speed,
                    isFlick,
                }
            }))

            if (isFlick) {
                console.log('flick')

                element.dispatchEvent(new CustomEvent('flick', {
                    detail: {
                        startX: context.startX,
                        startY: context.startY,
                        clientX: point.clientX,
                        clientY: point.clientY,
                        speed,
                        isFlick,
                    }
                }))
            }
        }

        if (context.isTap) {
            console.log('tap')
            element.dispatchEvent(new CustomEvent('tap', {}))
        }

        if (context.isPress) {
            console.log('press end')
            element.dispatchEvent(new CustomEvent('press-end', {}))
        }

        clearTimeout(context.timeoutHandler);
    }

    let cancel = (point, context) => {
        console.log('cancel')
        element.dispatchEvent(new CustomEvent('cancel', {}))
        clearTimeout(context.timeoutHandler);
    }

}