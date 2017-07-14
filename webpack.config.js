var path = require('path');

module.exports = {
	entry: './src/game.js',
	output: {
		filename: 'game.js',
		path: path.resolve(__dirname, 'public')
	},
	module: {
		loaders: [
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
					'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
					'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
				]
			}
		]
	}
}