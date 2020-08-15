const tty  = require('tty');
const ttys = require('ttys');
const rl   = require('rl');
const { resolve } = require('path');

const stdin  = ttys.stdin;
const stdout = ttys.stdout;

stdout.write('Hello world!\n')
stdout.write('\033[1A')
stdout.write('yu\n')

stdin.setRawMode(true)
stdin.resume();
stdin.setEncoding('utf8');

function getChar() {
    return new Promise(resolve => {
        stdin.once('data',  function (key) {
            resolve(key);
        })
    })
}

function up(n = 1) {
    stdout.write('\033'+`[${n}A`)
}

function down(n = 1) {
    stdout.write('\033'+`[${n}B`)
}

function left(n = 1) {
    stdout.write('\033'+`[${n}D`)
}

function right(n = 1) {
    stdout.write('\033'+`[${n}C`)
}

void async function () {
    await select(['vue', 'react', 'angular']);
}()

async function select(choices) {
    let selected = 0;
    for (let i = 0; i < choices.length; i++) {
        if (i === selected) {
            stdout.write(`[x]${choices[i]}\n`)
        } else {
            stdout.write(`[ ]${choices[i]}\n`)
        }
    }

    up(choices.length)
    right()

    while (true) {
        let char = await getChar();
        if (char === '\u0003') {
            process.exit();
            break;
        }
        if ((char === 'w') && selected > 0) {
            selected --;
            up();
        }
        if (char === 's' && selected < choices.length - 1) {
            selected ++;
            down();
        }
    }
}