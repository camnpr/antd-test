/**
*@description 发布信息
*/
import React from 'react';
import './App.less';
import TopMenu  from './TopMenu.jsx';
import ReleaseForm from './ReleaseForm.jsx';
import Footer  from './Footer.jsx';

const ReleaseApp = React.createClass({
	getInitialState(){
		return {
			isshow: "none"
		}
	},
	componentWillMount: function (argument) {
		// 获取用户cookie信息
		let getUser = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent("remember").replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
		if(!getUser){
			window.location.href="signin.html";
		}else{
			this.setState({isshow: "block"});
		}
	},
	render(){
	return <div>
		<TopMenu />
		<div className="fixcontent" style={{display:this.state.isshow}}>
			<ReleaseForm />
		</div>
		<Footer />
	</div>;
	}
});

export default ReleaseApp;