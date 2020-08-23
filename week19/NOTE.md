# 每周总结可以写在这里

## [build customize generator](toy-tool)

Customized generator should handle all necessary dependencies like npm package, template files, test units, etc which hold the basic project structure for team members.

### use `yeoman-generator` to create generator

### use `npmInstall` function for all necessary dependencies

````JS
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
````

### use `fs.copyTpl` function for copy all necessary templates or config files

````JS
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'), {
                name: 'tt-example'
            }
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
````

### use `fs.copyTpl` function for copy whole folder

````JS
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
````

## [setup public system](./publish)

After each new release, team should be easily to publish released files to server. The publish server should at least have these three components:

### [Hosting server](./publish/server)

Such system should be responsible for hosting release web apps or pages for end users.

### [publish server](./publish/publish-server-vanilla/index.js)

Such system should be responsible for deploying package files to Hosting server. Our case is just directly using local file system for directly writing packages to hosting server. In real case, Publish server might be in different location with hosting server, then other complex design like RPC and security will be envolved.

### [public tool](publish/publish-tool/publish.js)

Public tool kits should be responsible for preparing release package files.
