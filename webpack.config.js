/* eslint-disable no-var, strict, prefer-arrow-callback */

const webpack = require("webpack");
const path = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = [{
    cache: true,
    context: path.resolve(__dirname, "src"),
    entry: "./parser.ts",
    output: {
        filename: "./lib/index.js"
    },
    module: {
        rules: [{
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            use: ["ts-loader"],
        }
        ]
    },
    node: {
        fs: "empty"
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            // minimize: true,
            debug: false
        }),
        // new UglifyJSPlugin()
    ],
    resolve: {
        modules: [
            path.join(__dirname, "src"),
            "node_modules"
        ],
        extensions: [".ts", ".js"]
    }
}];

