var webpack = require('atool-build/lib/webpack');
//var HtmlWebpackPlugin = require('html-webpack-plugin');   // package.json 依赖 "html-webpack-plugin": "^1.6.1"
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function(webpackConfig) {
  webpackConfig.babel.plugins.push('antd');

// js压缩插件
  webpackConfig.plugins.push(
	new webpack.optimize.UglifyJsPlugin({
	    compress: {
	        warnings: false
	    }
	})
  );

// jquery全局引用（每个module里都可以使用）
/*webpackConfig.plugins.push(
	new webpack.ProvidePlugin({
	    $: "jquery",
	    jQuery: "jquery",
	    "window.jQuery": "jquery"
	})
 );*/

// 复制文件到指定位置（没有目录的，表示到build的目录output）
 webpackConfig.plugins.push(
  	new CopyWebpackPlugin([
  		{ from: 'fis-conf.js', to: 'fis-conf.js'}, // 复制html压缩，添加hash等FIS3配置文件。
  		{ from: 'index.html', to: 'index.html'},
  		{ from: 'activity.html', to: 'activity.html'},
  		{ from: 'car.html', to: 'car.html'},
  		{ from: 'logout.html', to: 'logout.html'},
  		{ from: 'my.html', to: 'my.html'},
  		{ from: 'mylist.html', to: 'mylist.html'},
		{ from: 'favorite.html', to: 'favorite.html'},
  		{ from: 'buy.html', to: 'buy.html'},
  		{ from: 'search.html', to: 'search.html'},
  		{ from: 'people.html', to: 'people.html'},
  		{ from: 'release.html', to: 'release.html'},
	    	{ from: 'signup.html', to: 'signup.html'},
	    	{ from: 'signin.html', to: 'signin.html'},
	    	{ from: 'view.html', to: 'view.html'},
	    	{ from: 'aboutus.html', to: 'aboutus.html'},
	    	{ from: 'app.html', to: 'app.html'}
	])
  );
  /*
// SPA单页面有用
  webpackConfig.plugins.push(
	new HtmlWebpackPlugin({
	        template: 'index.html', // Move the index.html file...
	        minify: { // Minifying it while it is parsed using the following, self–explanatory options
	          removeComments: true,
	          collapseWhitespace: true,
	          removeRedundantAttributes: true,
	          useShortDoctype: true,
	          removeEmptyAttributes: true,
	          removeStyleLinkTypeAttributes: true,
	          keepClosingSlash: true,
	          minifyJS: true,
	          minifyCSS: true,
	          minifyURLs: true
	        }
	})
  );*/

  // Fix ie8 compatibility
  webpackConfig.module.loaders.unshift({
    test: /\.jsx?$/,
    loader: 'es3ify-loader',
  });

  return webpackConfig;
};
