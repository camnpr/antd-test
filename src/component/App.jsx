import React from 'react';
import { Timeline, Tag, Card, Affix, Button, Input, Row, Col, message, notification, Spin } from 'antd';

import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
const TweenOneGroup = TweenOne.TweenOneGroup;

import './App.less';
import TopMenu  from './TopMenu.jsx';
import UseSteps  from './UseSteps.jsx';
import Welfare  from './Welfare.jsx';
import Footer  from './Footer.jsx';
import reqwest from 'reqwest';

let getUser = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent("remember").replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;

const App = React.createClass({
	getInitialState(){
		return {
			loading: false,
     			iconLoading: false,
     			commitList: (<Spin size="large" />)
		};
	},
	componentWillMount: function () {
		reqwest({
			url: '/getspitslots',
			method: 'get',
			//data: {"content": cont, "user": (getUser && getUser.split("|")[1] || "")},
			type: 'json',
			success:(result) => {
				if(result.state=="ok"){
					let temp = [];
					for(let item of result.result){
						temp.push(<span key={item.saddtime}><Tag color="blue">{item.scontent}</Tag></span>);
					}
					this.setState({commitList: temp})
				}
			}
		});
	},
	enterIconLoading() {
		let cont = document.getElementById("spitslotsContent").value;
	    	if(cont==""){
	    		message.warning("你确定不写点什么吗？");
	    		return;
	    	}
	    	let _this = this;
	    	_this.setState({ iconLoading: true });
	    	
		reqwest({
			url: '/savespitslots',
			method: 'POST',
			data: {"content": cont, "user": (getUser && getUser.split("|")[1] || "")},
			type: 'json',
			success:(result) => {
				if(result.state=="ok"){
					this.setState({iconLoading: false});
					document.getElementById("spitslotsContent").value = "";
					notification.success({
						duration:2,
					      	message: '恭喜你',
					      	description: "成功吐槽了："+cont,
					});
					_this.componentWillMount();
				}else{
					message.error(result.error || "发射失败");
				}
			}
		});
	},
	render(){
		return <div>
			<Welfare />
			<TopMenu />
			<div className="fixcontent" style={{height:"650px !important"}}>
				<Timeline>
				  <Timeline.Item color="green"><div style={{fontSize:"14px" }}>加入QQ群：378038268</div></Timeline.Item>
				  <Timeline.Item color="red">
					    <QueueAnim delay={500} style={{fontSize:"14px" }}>
					    <div key="a">1、本群主要为发布拼车信息、程序员交流技术，其他内容请私聊。 </div>
					    <div key="b">2、进群后请规范本人群名片，格式为：车或乘-北京地点-老家地点-昵称，群成员达上限时未修改的将清除。</div>
					    <div key="c">3、禁止运营车辆、黑车进群。</div>
					    <div key="d">4、拼车费用双方协商，建议容城-北京不超过<Tag color="red">50</Tag>元/位。</div>
					    <div key="e">5、发广告者一律飞机送回家。</div>
					  </QueueAnim>
				  </Timeline.Item>
				  <Timeline.Item>
				    	<h1 key="f" style={{fontSize:17, color:"red", fontWeight:"bold"}}>改名，改名，改名，重要的事情说三遍！！！</h1>
				  </Timeline.Item>
				</Timeline>
				<UseSteps />
				<Card title="本站解析" style={{ width: "100%", margin:"20px 0" }}>
				   <p>本小站主要为程序员提供拼车信息发布服务，后续会增加更多功能模块，欢迎提意见。</p>
				    <p>1、前端使用Ant Design组件（版本：antd@1.3.2）</p>
				    <p>2、后台使用expressjs</p>
				    <p>3、数据库使用mongodb</p>
				    <p>4、打包压缩工具使用FIS3（webpack）</p>
				    <p>5、涉及的知识有：antd、react、webpack、npm、nodejs、expressjs、fis3、mongodb、nginx、IIS</p>
				</Card>
			</div>
			<Footer />
			<Affix offsetBottom={5} className="app-spitslots-container">
			    <div style={{position:"relative", width:"450px", margin:"0 auto"}}>
			    	<Input id="spitslotsContent" size="large" style={{float:"left",width:"350px"}} placeholder="请输入您要吐槽的话，但请注意文明……O(∩_∩)O~" />
			    <Button type="primary" size="large" style={{float:"right"}} icon="cloud-upload-o" loading={this.state.iconLoading} onClick={this.enterIconLoading}>发射！</Button>
			    	<div style={{clear:"both"}}></div>
			    </div>
			</Affix>
			<div id="commitContainer" className="app-spitslots-container" style={{position:"fixed",bottom:"100px",right:0,width:"100%"}}>
				{this.state.commitList}
			  </div>
		</div>;
	}
});

export default App;

// <QueueAnim delay={500} style={{fontSize:"14px",position:"relative", textAlign:"right" }}>
//     	  {this.state.commitList}
//   </QueueAnim>