const path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const babelConfig = require('./babel.config');
const srcConfig = require('./../src/config.json');

// const prodMode = process.env.NODE_ENV === 'production';

const srcResolve = function (file) {
  return path.join(__dirname, '..', 'src', file);
};

const distResolve = function (file) {
  return path.join(__dirname, '..', file);
};

module.exports = {
  entry: {
    'index' : srcResolve('main/index.ts'),
  },
  output: {
    path: distResolve(''),
    filename: 'dist/[name].js',
    chunkFilename: 'dist/[name].js'
  },
  module: {
    rules: [
      // {
      //   test: /\.ts(x?)$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: "ts-loader"
      //     }
      //   ]
      // },
      // {
      //   test: /\.(js|jsx)$/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: babelConfig
      //   }
      // },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: srcResolve(''),
        loader: require.resolve('babel-loader'),
        options: {
          // customize: require.resolve(
          //   'babel-preset-react-app/webpack-overrides'
          // ),
          presets: [
            [
              require.resolve('babel-preset-react-app'),
              {
                runtime: 'classic',
              },
            ],
          ],
          // @remove-on-eject-begin
          babelrc: false,
          configFile: false,
          // @remove-on-eject-end
          plugins: [
            // [
            //   require.resolve('babel-plugin-named-asset-import'),
            //   {
            //     loaderMap: {},
            //   },
            // ],
          ].filter(Boolean),
        },
      },
      {
        test: /\.(css|less)$/,
        use: [
          // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          // 'postcss-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                return [];
              }
            }
          },
          'less-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', 'jsx', '.js' ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'dist/[name].css'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
    }
  }
  
  // externals: {},
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendor',
  //         chunks: 'all'
  //       }
  //     }
  //   }
  // }
}

