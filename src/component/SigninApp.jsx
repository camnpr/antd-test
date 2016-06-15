/**
*@description 登录
*/
import React from 'react';
import './App.less';
import TopMenu  from './TopMenu.jsx';
import Footer  from './Footer.jsx';
import { Button, Form, Checkbox, Input, message} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
import reqwest from 'reqwest';

let SigninApp = React.createClass({
	getInitialState() {
	    return { confirmLoading: false };
	},
	handleSubmit() {
	  	this.setState({confirmLoading: true});
	  	let mydata = this.props.form.getFieldsValue();
		reqwest({
			url: '/signin',
			method: 'POST',
			data: mydata,
			type: 'json',
			success:(result) => {
				if(result.state=="ok"){
					// 如果记住我，那么添加cookie信息
					/*let time = 60*60*2; // 2小时
					if(mydata.agreement==true){
						time = 60*60*24*365; // 一年
					}
					// setCookie("remember", mydata.username, time, "/", window.location.hostname, true)
					document.cookie = encodeURIComponent("remember") + "=" + encodeURIComponent(result.result+"|"+mydata.username) + "; expires=" + new Date((new Date).getTime() + 1e3 * time).toUTCString() + ";domain=" + window.location.hostname+ "; path=/";//+ "; secure";*/

					window.location.href="my.html";
				}else{
					this.setState({ confirmLoading: false });
					message.error(result.error || "请重新输入");
				}			
			}
		});
	  },
	render(){
		const { getFieldProps } = this.props.form;

		const formItemLayout = {
		      labelCol: { span: 4 },
		      wrapperCol: { span: 20 },
		};

		return <div>
			<TopMenu />
			<div className="fixcontent">
				<Form horizontal form={this.props.form} style={{width:400,margin:"30px auto"}}>
				            <FormItem {...formItemLayout} label="用户名：">
				              <Input {...getFieldProps('username', {})} type="text" autoComplete="off" />
				            </FormItem>
				            <FormItem {...formItemLayout} label="密码：">
				              <Input {...getFieldProps('password', {})} type="password" autoComplete="off" />
				            </FormItem>
				            <FormItem {...formItemLayout} label="&nbsp;">
					          <label className="ant-checkbox-inline">
					            <Checkbox {...getFieldProps('agreement')} />记住我
					          </label>
					</FormItem>
					<FormItem {...formItemLayout} label="&nbsp;">
					          <Button type="primary" loading={this.state.confirmLoading} onClick={this.handleSubmit}>提交</Button>
					</FormItem>
				</Form>
			</div>
			<Footer />
		</div>;
	}
});

SigninApp = createForm()(SigninApp);

export default SigninApp;