const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({ 
        template: './index.html', // will search the index.html
        title: 'Type' // replace the <%= HtmlWebpackPlugin.options.title %> 
      }),
      new WebpackPwaManifest({
        name: "Type",
        orientation: "standalone",
        display: "standalone", // feel like native browser | has status bar
        start_url: "./",
        publicPath: "./",
        short_name: "Type",
        description: "A single page text editor",
        background_color: "#015281",
        theme_color: "#015281",
        fingerprints: false,
        "icons": [
          {
            src: path.resolve('assets/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ]
      }),
      // Injects our custom service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
    ],

    module: {
      rules: [
        //Loaders, converts to js file
        //Added CSS LOADER & STYLE LOADER
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        //Added ASSETS
        {
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
          type: 'src/images', //files destination
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader', // converts syntax
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
