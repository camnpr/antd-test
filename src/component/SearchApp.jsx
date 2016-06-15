/**
*@description 搜索结果列表
*/
import React from 'react';
import './App.less';
import TopMenu  from './TopMenu.jsx';
import TableList  from './TableList.jsx';
import Footer  from './Footer.jsx';

function queryUrl(name) {
	var reg = new RegExp("(^|&|/?)" + name + "=([^&]*)(&|$)", "i");
	var _uri = decodeURIComponent(window.location.search);
	var r = _uri.substr(1).match(reg);
	if (r != null) return r[2];
	return null;
}

const SearchApp = React.createClass({
	render(){
		return <div>
			<TopMenu />
			<div className="fixcontent">
				<TableList search={queryUrl("k")} user="" utype="" />
			</div>
			<Footer />
		</div>;
	}
});

export default SearchApp;