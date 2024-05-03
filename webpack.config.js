const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const template = './template/template.meta';
const Meta = require(template);

module.exports = {
  entry: path.join(__dirname, 'src/docs'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: 'img/[path][name].[ext]', context: 'src/docs' },
          },
        ],
      },
      {
        test: /\.(glb)$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: 'glb/[path][name].[ext]', context: 'src/docs' },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      ...Meta,
      template: 'template/template.html',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  devServer: {
    port: 8000,
    open: true,
  },
};
