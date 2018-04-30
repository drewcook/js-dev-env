const MiniCssExtractPlugin = require("mini-css-extract-plugin");
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import webpack from "webpack";
import WebpackMd5Hash from "webpack-md5-hash";

export default {
	devtool: "source-map",
	entry: {
		main: path.resolve(__dirname, "src/index"),
		vendor: path.resolve(__dirname, "src/vendor"),
	},
	mode: "production",
	module: {
		rules: [
			{
				exclude: /node_modules/,
				test: /\.js$/,
				use: ["babel-loader" ],
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader?minimize=true"],
			},
		],
	},
	output: {
		filename: "[name].[chunkhash].js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "/",
	},
	plugins: [
		// Generate an external css file with a hash in the filename
		new MiniCssExtractPlugin({
			filename: "[name].[hash].css",
			chunkFilename: "[id].[hash].css",
		}),

		// Hash the files using MD5 so that their names change when the content changes
		new WebpackMd5Hash(),

		// Use CommonChunkPlugin to create a separate bundle
		// of vendor libraries so that they're cached separately
		new webpack.optimize.SplitChunksPlugin({
			chunks: "async",
			name: true,
			cacheGroups: {
				commons: {
					name: "commons",
					chunks: "initial",
					minChunks: 2,
				},
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					name: "vendors",
					chunks: "all",
				},
			},
		}),

		// Create HTML file that includes reference to bundled JS
		new HtmlWebpackPlugin({
			template: "src/index.html",
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true,
			},
		}),
	],
	target: "web",
};
