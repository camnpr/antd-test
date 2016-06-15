import React from 'react';
import { Row, Col} from 'antd';
import './App.less';
import TopMenu  from './TopMenu.jsx';
import Footer  from './Footer.jsx';

const BuyApp = React.createClass({
	componentWillMount: function (argument) {
	},
	render(){
	return <div>
		<TopMenu />
		<div className="fixcontent">
			拼车钱不够，那就发起众筹吧，出资1元，拼人气，马上上车。滴、一元卡！！！
		</div>
		<Footer />
	</div>;
	}
});

export default BuyApp;