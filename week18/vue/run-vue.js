const compiler = require('@vue/compiler-sfc');

const output = compiler.compileTemplate(
    {
        filename: 'example.vue', source: '<div>hell world</div>'
    }
);

console.log(output);