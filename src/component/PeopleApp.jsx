/**
*@description 人信息的列表
*/
import React from 'react';
import './App.less';
import TopMenu  from './TopMenu.jsx';
import TableList  from './TableList.jsx';
import Footer  from './Footer.jsx';

const MylistApp = React.createClass({
	render(){
		return <div>
			<TopMenu />
			<div className="fixcontent">
				<TableList user="" utype="2" />
			</div>
			<Footer />
		</div>;
	}
});

export default MylistApp;