import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";

export default {
	devtool: "source-map",
	entry: [
		path.resolve(__dirname, "src/index"),
	],
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
				use: ["style-loader", "css-loader" ],
			},
		],
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "/",
	},
	plugins: [
		// Create HTML file that includes reference to bundled JS
		new HtmlWebpackPlugin({
			template: "src/index.html",
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeReduncantAttributes: true,
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
