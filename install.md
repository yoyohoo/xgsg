$ npm init -y
$ npm install webpack webpack-dev-server vue-loader vue-html-loader css-loader vue-style-loader vue-hot-reload-api babel-loader babel-core babel-plugin-transform-runtime babel-preset-es2015 babel-runtime@5 --save-dev
$ npm install html-webpack-plugin --save-dev
$ npm install vue --save

$ webpack --display-modules --display-chunks --config build/webpack.config.js
$ node build/dev-server.js

jq:window.jQuery = window.$ = jQuery;
