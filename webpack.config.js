const webpack = require('webpack');
const path = require('path');

const config = {
    entry: ['babel-polyfill', path.resolve(__dirname, 'public/App.js')],
    output: {
        path: path.resolve(__dirname, '.build/js'),
        filename: 'components.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
}

//Optimize for Production
config.plugins = config.plugins || [];

//Use Production React
// config.plugins.push(new webpack.DefinePlugin({
//   process: {
//     env: {
//       NODE_ENV: JSON.stringify("production")
//     }
//   }
// }));
//Minify The Bundle
config.plugins.push(new webpack.optimize.UglifyJsPlugin({
  compress: { warnings: false }
}));

module.exports = config;