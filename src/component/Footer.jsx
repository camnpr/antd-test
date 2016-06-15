import React from 'react';
const Footer = React.createClass({
	render(){
		return <div id="MyFooter" style={{position:"absolute", bottom: 0, width:"100%",height:"50px", textAlign:"center", clear:"both", margin: '10px 0px 0px',borderTop:"solid 1px #ccc", padding:"10px 0px 0px"}}>
			&copy; 绕道儿拼车(PinChe.RaoDaoR.COM)  | <a href="/aboutus.html">关于我们</a> | <a href="mailto:2534082387@qq.com">合作联系</a> | <a href="http://weibo.com/bubuol" target="_blank">@新浪微博</a> | <a href="/app.html">绕道儿拼车手机版</a> | <a href="http://www.miitbeian.gov.cn/" target="_blank" style={{color:"#737573",textDecoration:"none"}}>豫ICP备10013645号-2</a>
			</div>;
	}
});

export default Footer;