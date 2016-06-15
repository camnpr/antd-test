import React from 'react';
import reqwest from 'reqwest';
import { Button, Form, Checkbox, Input, Modal, message} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;

let SigninForm = React.createClass({
	  getInitialState() {
	    return { visible: false };
	  },

	  handleSubmit() {
	  	this.setState({confirmLoading: true});
	  	let mydata = this.props.form.getFieldsValue();
		reqwest({
			url: '/signin',
			method: 'POST',
			data: mydata,
			type: 'json',
			//crossOrigin: true,
			//withCredentials: true,
			success:(result) => {
				if(result.state=="ok"){
					// 如果记住我，那么添加cookie信息
					/*let time = 60*60*2; // 2小时
					if(mydata.agreement==true){
						time = 60*60*24*365; // 一年
					}*/
					// setCookie("remember", mydata.username, time, "/", window.location.hostname, true)
					//document.cookie = encodeURIComponent("remember") + "=" + encodeURIComponent(result.result+"|"+mydata.username) + "; expires=" + new Date((new Date).getTime() + 1e3 * time).toUTCString() + ";domain=" + window.location.hostname+ "; path=/";//+ "; secure";

					this.hideModal();
					window.location.href="my.html";
				}else{
					this.setState({ confirmLoading: false });
					message.error(result.error || "请重新输入");
				}			
			}
		});
	  },

	  showModal() {
	    this.setState({ visible: true });
	  },

	  hideModal() {
	    this.setState({ visible: false, confirmLoading: false });
	  },

	  render() {
	    const { getFieldProps } = this.props.form;

	    const formItemLayout = {
	      labelCol: { span: 6 },
	      wrapperCol: { span: 18 },
	    };
	    return (
	      <div style={{marginTop:30}}>
	        已经注册过了？请&nbsp;&nbsp;<Button type="primary" onClick={this.showModal}>登录</Button>
	        <Modal title="登录" width={350} visible={this.state.visible} confirmLoading={this.state.confirmLoading} onOk={this.handleSubmit} onCancel={this.hideModal}>
	          <Form horizontal form={this.props.form}>
	            <FormItem {...formItemLayout} label="用户名：">
	              <Input {...getFieldProps('username', { rules: [{ required: true}]})} type="text" autoComplete="off" />
	            </FormItem>
	            <FormItem {...formItemLayout} label="密码：">
	              <Input {...getFieldProps('password', { rules: [{ required: true}]})} type="password" autoComplete="off" />
	            </FormItem>
	            <FormItem {...formItemLayout} label="&nbsp;">
		          <label className="ant-checkbox-inline">
		            <Checkbox {...getFieldProps('agreement')} />记住我
		          </label>
		</FormItem>
	          </Form>
	        </Modal>
	      </div>
	    );
	  }
});

SigninForm = createForm()(SigninForm);

export default SigninForm;