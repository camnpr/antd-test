/**
*@description 一条发布信息的详情页面
*/
import React from 'react';
import './App.less';
import { Row, Col, Card, Button, message,Spin, Icon, Tag, Alert } from 'antd';
import TopMenu  from './TopMenu.jsx';
import Footer  from './Footer.jsx';
import IDCard  from './IDCard.jsx';

import reqwest from 'reqwest';

function queryUrl(name) {
	var reg = new RegExp("(^|&|/?)" + name + "=([^&]*)(&|$)", "i");
	var _uri = decodeURIComponent(window.location.search);
	var r = _uri.substr(1).match(reg);
	if (r != null) return r[2];
	return null;
}

const ViewApp = React.createClass({
	getInitialState() {
	    return {
	      data:{"_id":"","ititle":"暂无","itype":1,"ifrom":"暂无","ito":"暂无","iprice":35,"istarttime":"1462442175931","iendtime":"1462442175931","iremark":"暂无","iaddtime":"1462442175931","iview":321,"isdel":false,"istop":false,"_user":{"_id":"","uname":"***","ugender":true,"usign":"***","uqq":"***","uphone":"***","uhead":""}},
	      relationList:(<Spin />),
	      relationMore: "/car.html",
	      idcard:(<Spin />),
	      favloading: false,
	      favsuccess: "primary"
	    };
	},
	componentWillMount: function () {
		let id = queryUrl("id"), _this  = this;
		reqwest({
			url: '/getinfo',
			method: 'POST',
			data: {"id": id},
			type: 'json',
			success:(result) => {
				if(result.state=="ok"){
					let res = result.result;
					_this.setState({data: res});
					document.title=result.result.ititle+" - 绕道儿拼车网";
					_this.setState({relationMore:res.itype==1?"/car.html":res.itype==2?"/people.html":"/activity.html"});
					_this.setState({idcard:(<IDCard touser={res._user._id} data={null} />)}); // res._user
					// 判断是否收藏过了
					if(result.isfavorite){
						_this.setState({favsuccess: "dashed"});
					}

					// 获取相关发布的消息
					reqwest({
						url: '/getNewOrRelationInfo',
						method: 'get',
						data:{"key":res.ifrom+"-"+res.ito, "limit":10},
						type: 'json',
						success:(result) => {
							if(result.state=="ok"){
								let temp = [];
								for(let item of result.result){
									temp.push(<a key={item._id} href={"view.html?id="+item._id} title={"从【"+item.ifrom+"】到【"+item.ito+"】"}>{item.ititle}</a>);
								}
								_this.setState({relationList: temp})
							}
						}
					});
				}else{
					message.error(result.error || "获取失败");
				}			
			}
		});
	},
	favorite(){
		this.setState({favloading: true});
		reqwest({
			url: '/addfavorite',
			method: 'POST',
			data: {"infoid": this.state.data._id, "infouserid": this.state.data._user._id},
			type: 'json',
			success:(result) => {
				this.setState({favloading: false});
				if(result.state=="ok"){
					this.setState({favsuccess: "dashed"});
					message.success("Good，收藏成功！可以到【我的收藏】里查看哟！");
				}else{
					message.error(result.error || "收藏失败");
				}
			}
		});
	},
	render(){
		return <div>
			<TopMenu />
			<div className="fixcontent">
				<Row gutter={16}>
				      <Col span={18}>
				        <div style={{fontWeight:"bold", fontSize:"20px",marginBottom:"15px"}}>{this.state.data.itype==1?<Tag color="green">找车</Tag>:this.state.data.itype==2?<Tag color="yellow">找人</Tag>:<Tag color="red">活动</Tag>} {this.state.data.ititle}&nbsp;&nbsp;发布时间：{this.state.data.iaddtime}&nbsp;&nbsp;&nbsp;<Button type={this.state.favsuccess} loading={this.state.favloading} icon="star" onClick={this.favorite}>{this.state.favsuccess=="dashed"?"已收藏":"收藏"}</Button></div>
				        <Alert message="出发地【到】目的地：" description={"从【" + this.state.data.ifrom+"】 到 【" + this.state.data.ito+"】"} type="success" />
				        <Alert message="有效期：" description={"【" + this.state.data.istarttime+"】 - 【" + this.state.data.iendtime+"】"} type="success" />
				        <Alert message="备注说明：" description={this.state.data.iremark} type="info" />
				      </Col>
				      <Col span={2}>
				           {this.state.idcard}
				      </Col>
				      </Row>
				<Card className="relate-new-info" style={{marginTop:"20px"}} title="相关信息" extra={<a href={this.state.relationMore}>更多</a>}>
				    {this.state.relationList}
				</Card>
			</div>
			<Footer />
		</div>;
	}
});

export default ViewApp;