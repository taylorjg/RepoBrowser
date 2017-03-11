const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './scripts/app.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new CopyWebpackPlugin([
            { context: '.', from: '*.html' },
            { context: '.', from: 'templates/**/*.html' },
            { context: '.', from: 'css/**/*.css' },
            { context: '.', from: 'assets/**/*.gif' }
        ])
    ],
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './dist'
    }
};
