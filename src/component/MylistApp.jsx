/**
*@description 我发布的信息列表
*/
import React from 'react';
import './App.less';
import TopMenu  from './TopMenu.jsx';
import TableList  from './TableList.jsx';
import Footer  from './Footer.jsx';

// 获取用户cookie信息
const getUser = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent("remember").replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;

function queryUrl(name) {
	var reg = new RegExp("(^|&|/?)" + name + "=([^&]*)(&|$)", "i");
	var _uri = decodeURIComponent(window.location.search);
	var r = _uri.substr(1).match(reg);
	if (r != null) return r[2];
	return null;
}

const MylistApp = React.createClass({
	render(){
		return <div>
			<TopMenu />
			<div className="who-is-i"></div>
			<div className="fixcontent">
				<TableList user={getUser.split("|")[0]} otheruser={queryUrl("id")} utype="" />
			</div>
			<Footer />
		</div>;
	}
});

export default MylistApp;