// 本地数据 mock
module.exports = {
	// Forward 到另一个服务器
	'GET /list': 'http://127.0.0.1:3000/list?itype=&pageSize=10&currentPage=1',
	'GET /uploads/': 'http://127.0.0.1:3000/uploads/',
	'GET /getspitslots': 'http://127.0.0.1:3000/',
	'GET /searchSuggest': 'http://127.0.0.1:3000/',
	'GET /getTopUserList': 'http://127.0.0.1:3000/',
	'GET /getNewOrRelationInfo': 'http://127.0.0.1:3000/',
	'GET /getfavorite': 'http://127.0.0.1:3000/',
	'POST /getinfo': 'http://127.0.0.1:3000/',
	'POST /getUserInfoById': 'http://127.0.0.1:3000/',
	'POST /existByName': 'http://127.0.0.1:3000/',
	'POST /signin': 'http://127.0.0.1:3000/',
	'POST /upload': 'http://127.0.0.1:3000/',
	'POST /signup': 'http://127.0.0.1:3000/',
	'POST /savespitslots': 'http://127.0.0.1:3000/',
	'POST /topdown': 'http://127.0.0.1:3000/',
	'POST /addfavorite': 'http://127.0.0.1:3000/',
	'POST /publish': 'http://127.0.0.1:3000/',

	// 本地文件替换
  	// 'GET /local': './local.js',

	// Mock 数据返回
	'GET /test': [{"a": 1, "b": 2}],

	// Mock 数据，基于 mockjs
	/* 'GET /users': require('mockjs').mock({
	    success: true,
	    data: [{name:'@Name'}],
	}),*/
};