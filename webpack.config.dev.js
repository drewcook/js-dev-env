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
				use: ["babel-loader" ],
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader" ],
			},
		],
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "src"),
		publicPath: "/",
	},
	plugins: [
		// Create HTML file that includes reference to bundled JS
		new HtmlWebpackPlugin({
			template: "src/index.html",
			inject: true,
		}),
	],
	target: "web",
};
