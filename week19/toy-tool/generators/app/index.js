const Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }

    collecting() {
        this.log('Start to generate the project');
    }

    creating() {
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'), {
                name: 'tt-example'
            }
        );

        this.fs.copy(
            this.templatePath('lib'),
            this.destinationPath('lib')
        );

        this.fs.copy(
            this.templatePath('components'),
            this.destinationPath('components')
        );

        this.fs.copyTpl(
            this.templatePath('src'),
            this.destinationPath('src')
        );

        this.fs.copyTpl(
            this.templatePath('test'),
            this.destinationPath('test')
        );

        this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath('webpack.config.js')
        );

        this.fs.copyTpl(
            this.templatePath('.babelrc'),
            this.destinationPath('.babelrc')
        );

        this.fs.copyTpl(
            this.templatePath('.nycrc'),
            this.destinationPath('.nycrc')
        );

        this.npmInstall([
            "@babel/core",
            "@babel/plugin-transform-react-jsx",
            "@babel/preset-env",
            "@babel/register",
            "babel-loader",
            "babel-plugin-istanbul",
            "@istanbuljs/nyc-config-babel",
            "css",
            "css-loader",
            "mocha",
            "nyc",
            "webpack",
            "webpack-cli",
            "webpack-dev-server",
            "html-webpack-plugin"
        ], {
            'save-dev': true
        });
    }
};