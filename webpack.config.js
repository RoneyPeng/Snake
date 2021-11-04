var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpackConfig = {
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, './build'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: ['babel-loader'],
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html'
		})
	]
};

module.exports = webpackConfig;
