import React from 'react';
import { Row, Col} from 'antd';
import './App.less';
import TopMenu  from './TopMenu.jsx';
import SignupForm from './SignupForm.jsx';
import SigninForm from './SigninForm.jsx';
import Footer  from './Footer.jsx';

const MyApp = React.createClass({
	componentWillMount: function (argument) {
		// 获取用户cookie信息
		let getUser = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent("remember").replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
		if(!getUser){
			window.location.href="signin.html";
		}
	},
	render(){
	return <div>
		<TopMenu />
		<div className="fixcontent">
			<SignupForm />
		</div>
		<Footer />
	</div>;
	}
});

export default MyApp;