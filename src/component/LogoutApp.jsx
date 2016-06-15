import React from 'react';
import './App.less';
import { Spin, Icon } from 'antd';
import Welfare  from './Welfare.jsx';

const LogoutApp = React.createClass({
	componentDidMount(){
		setTimeout(function (argument) {
			document.cookie = "remember=; expires=Thu, 01 Jan 1970 00:00:00 GMT";//;domain=" + window.location.hostname+ "; path=/";
  			window.location.href="index.html";
		}, 3000);
	},
	render(){
		return <div>
			<Welfare />
			<div style={{textAlign:"center",background: "rgba(0,0,0,0.05)",borderRadius: "4px",marginBottom: "20px",padding: "30px 50px",margin: "20px 0"}}>
			     欢迎下次再来！！！<Icon type="smile-circle" /><br />
			     正在退出中，请稍后&nbsp;&nbsp;<Spin />
			</div>
		</div>;
	}
});

export default LogoutApp;