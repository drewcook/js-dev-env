const MiniCssExtractPlugin = require("mini-css-extract-plugin");
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";

export default {
	devtool: "inline-source-map",
	entry: [
		path.resolve(__dirname, "src/index"),
	],
	mode: "development",
	module: {
		rules: [
			{
				exclude: /node_modules/,
				test: /\.js$/,
				use: ["babel-loader"],
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
		],
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "src"),
		publicPath: "/",
	},
	plugins: [
		// Generate an external css file with a hash in the filename
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css",
		}),
		// Create HTML file that includes reference to bundled JS
		new HtmlWebpackPlugin({
			template: "src/index.html",
			inject: true,
		}),
	],
	target: "web",
};
