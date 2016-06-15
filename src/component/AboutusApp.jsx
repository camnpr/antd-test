/**
*@description 关于我们
*/
import React from 'react';
import './App.less';
import {Tabs, Tag} from 'antd';
import TopMenu  from './TopMenu.jsx';
import Footer  from './Footer.jsx';
const TabPane = Tabs.TabPane;

const AboutusApp = React.createClass({
	componentWillMount: function (argument) {
	},
	render(){
		return <div className="aboutus-app">
			<TopMenu />
			<div className="fixcontent">
			    <Tabs tabPosition="left" defaultActiveKey="1">
			      <TabPane tab="关于我们" key="1">
			      	<h1 className="txt-title-css">关于绕道儿拼车网</h1>
			      	<div className="txt-content-css">绕道儿拼车网是一个车主发布拼车和乘客寻找拼车的信息平台。<br />参与者分两类：一类是有车族，本来就要开车出差、返乡、旅游、上班，而车上又有空余座位；另一类是搭车族，买不到车票（机票）或不愿意挤公交（地铁）交通不太方便。<br />
			      	<Tag color="red">温馨小贴士：</Tag>在出发前，双方签订协议并确认身份证等安全信息，协议内容包括绝不允许临时附加收费、明确出发到达时间地点等，此外我们建议拼车双方各自上相关保险。
			      	</div>
			      </TabPane>
			      <TabPane tab="长途拼车相关注意事项" key="2">
			      	<h1 className="txt-title-css">长途拼车相关注意事项</h1>
			      	<div className="txt-content-css">一、尽量提早时间在拼车网发布和查找拼车信息，给拼车车主和乘客之间有更早的准备。<br />
					二、拼车会员可以出示有效证件（户口、身份证、驾驶证、车辆行驶证、保险资料单发票等）到本站登记备案，资料保密尽量选择网站诚信指数高的用户拼车。<br />				 
					三、选择合适的拼车时间，尽量联系多人一起拼车。<br />				 
					四、拼车时要核对对方身份，记下对方电话号码、住址、单位、职业情况等信息，查看身份证、驾驶证等，最后不要忘了查看车况和保险记录。<br />					 
					五、拼车乘客应和车主仔细交流，在交易前就确定费用、行车路线、搭车时间等情况，减少不必要的纠纷。<br />					 
					六、多人拼车还要对有人迟到毁约情况做出商定。<br />					 
					七、在拼车网查询车主或拼车会员的历史拼车记录，选择诚信可靠的用户一起拼车。<br />	 
					八、建立自己的拼车档案，尽量让车主和搭车人保持长期合作关系。<br />			 
					九、双方出发前会尽量了解清楚对方的底细，到时也会小心看管好自己的财物，相信世界上还是好人多，应该不会有什么问题。<br />					 
					十、如果你私家车车主，一定记得利用“车上乘客责任保险”保证双方利益。
			      	</div>
			      </TabPane>
			      <TabPane tab="长途拼车安全注意事项" key="3">
			      	<h1 className="txt-title-css">长途拼车相关注意事项</h1>
			      	<div className="txt-content-css">您找到了您的拼车伙伴，请参考以下内容,您会避免一些路上可能发生的麻烦：<br /> 
					一、留下对方的电话及相关信息，为了安全也为了以后能更好的联系。<br />		 
					二、确定具体的上车地点及出发时间，并且注意行车过程中不要违章； 如违章，由当时开车司机承担，请事先约定好。<br />					 
					三、了解您的拼车伙伴是不是能经常一起拼车。<br />					 
					四、事先确定好关于吸烟的规则，特别是有女性和小孩在场的时候。<br />			 
					五、事先确定一下交通状况，例如郑州交通台等了解是否有适宜的天气等，选择良好的天气出行以保证安全；<br />					 
					六、事先确定一下是否有非计划内的路线或停车， 如有该如何应对。<br />			 
					七、如果遇到特殊情况，如一方无法履行约定，如何提前通知对方；一般情况下，不要让司机久等，应本着准时守约的原则。双方应根据实际情况事先商定一个时间，超过约定时间为放弃。
			      	</div>
			      </TabPane>
			      <TabPane tab="乘客拼车基本注意事项" key="4">
			      	<h1 className="txt-title-css">乘客拼车基本注意事项</h1>
			      	<div className="txt-content-css">一、确证对方真实身份<br /><br /> 
					拼车前，确认对方真实身份是最重要的一个环节。<br />
					首先您应该在安全的公共场合约见对方。<br />
					约见时要求对方出示身份证或其他有效证件，并交换复印件，互留电话号码，至少要求对方留一个固定电话号码，住宅或者工作单位均可。<br />
					事后应该拨打该固定电话，确认电话的真实性。<br /><br />				 
					二、拼车过程中的安全<br /><br />					 
					避免夜间出行，避免途经人烟稀少的路段。<br />
					避免携带大量现金和贵重物品。<br />
					确保您的手机可以正常使用，以便用于紧急情况呼救。<br />
					如果驾驶员疲劳驾驶，或者酒后驾驶，务必换乘其他车辆以确保安全
			      	</div>
			      </TabPane>
			      <TabPane tab="如何进行实名认证？" key="5">
			      	<h1 className="txt-title-css">如何进行实名认证？</h1>
			      	<div className="txt-content-css">
			      		用户登录到用户中心后，点击“帐号设置”按钮，进入帐号设置界面：<br />
					邮箱未认证的用户，在输入邮箱项后面点击，发送验证邮件。（用户登录自己填写的邮箱中打开系统自动发出验证邮件中的激活链接即可）<br />
					实名未认证的用户，请填写姓名、身份证、性别后上传相关身份证明的扫描件后即可（客服将在三天内完成您的实名认证，有可能客服会于您取得联系）
			      	</div>
			      </TabPane>
			      <TabPane tab="关于线下车主与乘客纠纷处理" key="6">
			      	<h1 className="txt-title-css">关于线下车主与乘客纠纷处理</h1>
			      	<div className="txt-content-css">
					本着方便你们的原则，希望和谐处理，我们只是搭建一个平台，还是建议拼车双方各自上相关保险。
					<br />拼车者最好购买人身意外险或相应的保险，一旦发生意外，也多了份保障。
			      	</div>
			      </TabPane>
			    </Tabs>
			</div>
			<Footer />
		</div>;
	}
});

export default AboutusApp;