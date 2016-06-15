/**
*@description 我的收藏（信息）
*/
import React from 'react';
import './App.less';
import { message, Pagination, Tag, Spin } from 'antd';
import TopMenu  from './TopMenu.jsx';
import Footer  from './Footer.jsx';
import reqwest from 'reqwest';

const FavoriteApp = React.createClass({
	getInitialState() {
	    return {
	      current: 1,
	      total: 10,
	      template:(<Spin />)
	    };
	},
	componentWillMount: function (argument) {
		let getUser = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent("remember").replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
		if(!getUser){
			window.location.href="signin.html";
		}
		this.fetch();
	},
	fetch(){
		reqwest({
			url: '/getfavorite',
			method: 'get',
			type: 'json',
			data:{"currentPage": this.state.current },
			success:(result) => {
				if(result.state=="ok"){
					let temp = [];
					for(let item of result.result){
						temp.push(<li><Tag color="green">找车</Tag><a key={item.infoid} href={"view.html?id="+item.infoid} title={"从【"+item.ifrom+"】到【"+item.ito+"】"}>{item.title}</a><div className="publish-time">发布时间：{item.addtime}</div></li>);
					}
					this.setState({total: result.totalCount, template: temp.length==0?(<div>您还没有收藏过任何信息！</div>):temp});
				}
			}
		});
	},
	onChange(page) {
	    this.setState({
	      current: page,
	    });
	    this.fetch();
	},
	render(){
		return <div>
			<TopMenu />
			<div className="fixcontent">
				<ul className="favorite-flow">
					{this.state.template}
				</ul>
				<div style={{clear:"both"}}></div>
				<Pagination current={this.state.current} onChange={this.onChange}  total={this.state.total} />
			</div>
			<Footer />
		</div>;
	}
});

export default FavoriteApp;