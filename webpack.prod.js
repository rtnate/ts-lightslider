const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var entries = {};

console.log(common.entry);

if (typeof common.entry == 'object')
{
    var keys = Object.keys(common.entry);
    keys.forEach(
        (item) => { 
            entries[item] = common.entry[item];
            let min = item + '.min';
            entries[min] = common.entry[item];
        }
    );
}
else if (typeof common.entry == 'string')
{
    entries['bundle'] = common.entry;
    entries['bundle.min'] = common.entry;
}

module.exports = merge(common, 
{
    mode: 'production',
    entry: entries,
    optimization: {
        minimizer: [
          new UglifyJsPlugin({
            include: /\.min\.js$/,
            uglifyOptions: {
              warnings: false,
              parse: {},
              compress: {},
              mangle: false, // Note `mangle.properties` is `false` by default.
              output: null,
              toplevel: false,
              nameCache: null,
              ie8: false,
              keep_fnames: true,
            },
          }),
        ],
      },
})