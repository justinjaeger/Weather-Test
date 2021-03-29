var path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
    entry : path.resolve(__dirname, './client/src/index.jsx'),
    output : {
        path : path.resolve(__dirname , 'dist'),
        filename: 'bundle.js',
    },
    module : {
        rules : [
          {
            test: /.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-react', '@babel/preset-env'],
              },
            },
          },
          {
            test: /.(css|scss)$/,
            use: [
              'style-loader',
              'css-loader',
              'sass-loader'
            ]
          },
          {
            test: /.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
            use: [
              'file-loader',
            ],
          },
        ]
    },
    mode:'development',
    plugins : [
        new HtmlWebpackPlugin ({
          template: './client/src/index.html',
          filename: "./index.html"
        })
    ]

}
