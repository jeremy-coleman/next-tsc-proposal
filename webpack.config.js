const { resolve } = require('path');
const webpack = require('webpack');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsPathAliasPlugin = require('tsconfig-paths-webpack-plugin')
const outputPath = resolve(__dirname, 'app', 'app');
const CleanObsoleteChunkPlugin = require("webpack-clean-obsolete-chunks")

module.exports = {
  entry: ['./src/app/main.tsx', 'webpack-plugin-serve/client'],
  mode: 'development',
  stats:"minimal",
  devtool: 'cheap-eval-source-map',
  resolve:{ 
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".mjs", ".wasm"],
    //mainFields: ['module', 'browser', 'main'],
    plugins: [
      new TsPathAliasPlugin({configFile: './tsconfig.json'})
    ],
},

  module: {
    rules: [
      {
        test: /\.([tj]sx?)$/,
        exclude: /node_modules/,
        use: [
          {loader: 'ts-loader', options: {transpileOnly: true, experimentalWatchApi: true}},
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.woff(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'fonts/[name].[ext]',
            mimetype: 'application/font-woff'
          }
        }
      },
      {
        test: /\.woff2(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'fonts/[name].[ext]',
            mimetype: 'application/font-woff2'
          }
        }
      },
      {
        test: /\.(otf)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }
      },
      {
        test: /\.ttf(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'fonts/[name].[ext]',
            mimetype: 'application/octet-stream'
          }
        }
      },
      {
        test: /\.svg(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'images/[name].[ext]',
            mimetype: 'image/svg+xml'
          }
        }
      },
      {
        test: /\.(png|jpg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'images/[name].[ext]'
          }
        }
      }
    ]
  },
  output: {
    path: outputPath,
    publicPath: '/',
    filename: 'client.js'
  },
  plugins: [
    new HtmlWebpackPlugin({template: 'src/app/index.html'}),
    //new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV)}}),
    //new webpack.NamedModulesPlugin(),
    new Serve({
      open: true,
      hmr: true,
      host: "localhost",
      progress: false,
      historyFallback: true,
      static: [outputPath]
    }),
    new CleanObsoleteChunkPlugin(),
  ],
    optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  watch: true
};
