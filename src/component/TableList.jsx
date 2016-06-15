import React from 'react';
import {Table, Popconfirm, message, Tag, Row, Col, Card, Rate, Alert, Spin} from 'antd';
import reqwest from 'reqwest';
import IDCard  from './IDCard.jsx';

let currentKey = "", currentTableObj;

const onClose = function (e) {
   message.success('你真是一个智商超群的人，拼车绝对有主见！');
};

const getUser = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent("remember").replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;

function queryUrl(name) {
	var reg = new RegExp("(^|&|/?)" + name + "=([^&]*)(&|$)", "i");
	var _uri = decodeURIComponent(window.location.search);
	var r = _uri.substr(1).match(reg);
	if (r != null) return r[2];
	return null;
}

function delItem() {
  	reqwest({
		url: '/delinfo',
		method: 'post',
		data: {id:currentKey},
		type: 'json',
		success:(result) => {
			if(result.state=="ok"){
	                  		currentTableObj.fetch();
			}else{
				message.error(result.error);
			}
		}
	});
}

let columns = [];

const  TableList = React.createClass({
	getInitialState(){
		return {
			data: [],
			pagination:{},
			loading:false,
			newestList:(<Spin />),
			carOwnerList:(<Spin />),
			passengerList: (<Spin />)
		};
	},
	componentWillMount: function () {
		// 获取最新发布的消息
		reqwest({
			url: '/getNewOrRelationInfo',
			method: 'get',
			type: 'json',
			success:(result) => {
				if(result.state=="ok"){
					let temp = [];
					for(let item of result.result){
						temp.push(<a key={item._id} href={"view.html?id="+item._id} title={"从【"+item.ifrom+"】到【"+item.ito+"】"}>{item.ititle}</a>);
					}
					this.setState({newestList: temp})
				}
			}
		});
		// 获取明星车主
		reqwest({
			url: '/getTopUserList',
			method: 'get',
			data:{"type": 2},
			type: 'json',
			success:(result) => {
				if(result.state=="ok"){
					let temp = [];
					for(let item of result.result){
						if(item._touser){
							temp.push(<a key={item._touser._id} href={"mylist.html?id="+item._touser._id}><img src={"/uploads/"+item._touser.uhead} />{item._touser.uname}&nbsp;<span className={item._touser.ugender?"boysex":"girlsex"}></span></a>);
						}
					}
					this.setState({carOwnerList: temp})
				}
			}
		});
		// 获取靠谱乘客
		reqwest({
			url: '/getTopUserList',
			method: 'get',
			data:{"type": 3},
			type: 'json',
			success:(result) => {
				if(result.state=="ok"){
					let temp = [];
					for(let item of result.result){
						if(item._touser){
							temp.push(<a key={item._touser._id} href={"mylist.html?id="+item._touser._id}><img src={"/uploads/"+item._touser.uhead} />{item._touser.uname}&nbsp;<span className={item._touser.ugender?"boysex":"girlsex"}></span></a>);
						}
					}
					this.setState({passengerList: temp})
				}
			}
		});
	},
	handleTableChange(pagination, filters, sorter){
		const pager = this.state.pagination;
		pager.current = pagination.current;
		this.setState({
			pagination:pager
		});
		this.fetch({
			pageSize: pagination.pageSize,
			currentPage: pagination.current,
			sortField: sorter.field,
			sortOrder: sorter.order,
			...filters
		});
	},
	tableRowClick(record, index){
		currentKey = record.key;//设置当前的记录id
		currentTableObj = this;
	},
	fetch(params = {}){
		this.setState({loading: true});
		params.itype=this.props.utype || (Array.isArray(params.itype)?params.itype.join(','): params.itype);
		params.user=this.props.otheruser || this.props.user;
		params.search = this.props.search || "";
		reqwest({
			url: '/list',
			method: 'get',
			data: params,
			type: 'json',
			success:(result) => {
				const pagination = this.state.pagination;
				pagination.total = result.totalCount;
				this.setState({
					loading: false,
					data: result.result,
					pagination
				});
			}
		});
	},
	componentDidMount(){
		if(!this.props.utype){
			columns.push({
				title: '标题',
				dataIndex: 'title',
				render(text,record, index) {
					let temp = "view.html?id="+record.key,
					     tag = record.type==1?<Tag color="green">找车</Tag>:record.type==2?<Tag color="yellow">找人</Tag>:<Tag color="red">活动</Tag>;
				    return (
				    	<a href={temp}>{tag} {index+1}、{text}</a>
				    	);
				},
				filterMultiple: false,
				filters:[
					{text: '找车', value: '1'},
					{text: '找人', value: '2'},
					{text: '活动', value: '3'}
				]}
			);
		}else{
			columns.push({
				title: '标题',
				dataIndex: 'title',
				render(text,record, index) {
					let temp = "view.html?id="+record.key,
					     tag = record.type==1?<Tag color="green">找车</Tag>:record.type==2?<Tag color="yellow">找人</Tag>:<Tag color="red">活动</Tag>;
				    return (
				    	<a href={temp}>{tag} {index+1}、{text}</a>
				    	);
				}
			});
		};

		columns.push({
			title: '发布时间',
			dataIndex: 'addtime',
			sorter: true
		});
		columns.push({
			title: '出发地',
			dataIndex: 'from'
		});
		columns.push({
			title: '目的地',
			dataIndex: 'to'
		});
		columns.push({
			title: '价格（元）',
			dataIndex: 'price'
		});
		columns.push({
			title: '发布人',
			dataIndex: 'head',
			render(text,record, index) {
				let uname = record.name, head = "/uploads/"+text;
			    return (
			    	<a href={"/mylist.html?id="+record.uid}><img alt={uname} height="50px" src={head} /></a>
			    	);
			}
		});
		if(this.props.user && !this.props.otheruser){
			columns.push({
			  title: '操作',
			  key: 'key',
			  render(text, record) {
			  	let kid = "view.html?id="+record.key;
			    return (
			      <span>
			        <Popconfirm title="确定要删除吗？" onConfirm={delItem}>
				    <a href="javascript:void(0)">删除</a>
			        </Popconfirm>
			        <span className="ant-divider"></span>
			        <a href="javascript:void(0)">置顶</a>
			      </span>
			    );
			  }
			});
		}
		this.fetch();
	},
	render(){
		return (
			 <Row gutter={16}>
			      <Col className="gutter-row" span={18}>
			        <Table columns={columns} 
				dataSource={this.state.data} 
				pagination={this.state.pagination} 
				loading={this.state.loading} 
				onRowClick={this.tableRowClick}
				onChange={this.handleTableChange} />
			      </Col>
			      <Col className="new-info-list" span={6}>
			      	<IDCard touser={queryUrl("id") || getUser && getUser.split("|")[0] || "null"} data={null} /><br />
			      	<Alert message="拼车须知："
				    description="请确认好对方的信息，拼车有风险，出行需谨慎！！！ 【更多信息，请查阅底部的“关于我们”】"
				    type="warning"
				    closable
				    showIcon 
				    onClose={onClose} />
			            <br />
			      	<a href="###">防狼喷雾！！！！</a><Rate disabled defaultValue={5} />
			      	<br />
			        	<Card title="最新发布" extra={<a href="#">更多</a>} style={{ width: "100%" }}>
				    {this.state.newestList}
				  </Card>
				  <br />
			       	<Card title="明星车主" className="top-people" extra={<a href="#">更多</a>} style={{ width: "100%" }}>
				    {this.state.carOwnerList}
				  </Card>
				  <br />
			       	<Card title="靠谱乘客" className="top-people" extra={<a href="#">更多</a>} style={{ width: "100%" }}>
				    {this.state.passengerList}
				  </Card>
				  <br />
			       </Col>
			</Row>
		)
	}
});

TableList.propTypes = {
  user: React.PropTypes.string.isRequired,
  otheruser: React.PropTypes.string,
  utype: React.PropTypes.string.isRequired,
  search: React.PropTypes.string
}

export default TableList;