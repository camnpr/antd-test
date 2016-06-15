import React from 'react';
import './App.less';
import { Row, Col } from 'antd';
import TopMenu  from './TopMenu.jsx';
import SignupForm from './SignupForm.jsx';
import SigninForm from './SigninForm.jsx';
import Footer  from './Footer.jsx';

const SignupApp = React.createClass({
	render(){
	return <div>
		<TopMenu />
		<div className="fixcontent">
			<Row>
			      <Col span="19"><SignupForm /></Col>
			      <Col span="5"><SigninForm /></Col>
			</Row>
		</div>
		<br /><br />
		<Footer />
	</div>;
	}
});

export default SignupApp;