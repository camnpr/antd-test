import React from 'react';
import { Steps } from 'antd';
const Step = Steps.Step;

// 获取用户cookie信息
const getUser = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent("remember").replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;

const steps = [{
	  title: '我来了',
	  icon: 'like',
	  description: '我真是太有品味了！'
	}, {
	  title: '注册',
	  icon: 'environment-o',
	  description: '填写我的身份资料！'
	}, {
	  title: '登录',
	  icon: 'smile',
	  description: '发布找车找人信息！'
	}, {
	  title: '有空就来',
	  icon: 'home',
	  description: '有需求就过来看看吧！'
	}].map((s, i) => <Step key={i} title={s.title} icon={s.icon} description={s.description} />);

const UseSteps = React.createClass({
	render(){
		return <div style={{margin: '3px 10px'}}>
				<Steps current={(getUser?3:0)}>{steps}</Steps>
			</div>;
	}
});

export default UseSteps;