const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


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

    //Workbox Plugins
    plugins: [
      new HtmlWebpackPlugin({ 
        template: './index.html', // will search the index.html
        title: 'Type | Text Editor' // replace the <%= HtmlWebpackPlugin.options.title %> 
      }),
      new WebpackPwaManifest({
        name: "Type",
        orientation: "portrait", // relative to display
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
            src: path.resolve('src/images/logo.png'),
            sizes: [48,  96, 128, 192, 256, 384, 512], // 48x48 for favicon
            destination: path.join('assets', 'icons'), //-
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
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
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
