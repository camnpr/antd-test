/**
*@description 车信息的列表
*/
import React from 'react';
import './App.less';
import TopMenu  from './TopMenu.jsx';
import TableList  from './TableList.jsx';
import Footer  from './Footer.jsx';

const CarApp = React.createClass({
	componentWillMount: function (argument) {
	},
	render(){
		return <div>
			<TopMenu />
			<div className="fixcontent">
				<TableList user="" utype="1" />
			</div>
			<Footer />
		</div>;
	}
});

export default CarApp;