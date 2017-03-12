const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const serverPublic = path.join(__dirname, 'server', 'public');

module.exports = {
    entry: './client/scripts/app.js',
    output: {
        path: serverPublic,
        filename: 'bundle.js',
    },
    plugins: [
        new CopyWebpackPlugin([
            { context: './client', from: '*.html' },
            { context: './client', from: 'templates/**/*.html' },
            { context: './client', from: 'css/**/*.css' },
            { context: './client', from: 'assets/**/*.gif' }
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
        contentBase: serverPublic
    }
};
