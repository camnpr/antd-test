import React from 'react';
import SearchBox  from './SearchBox.jsx';
import {Menu, Icon, Tooltip, Popover, Dropdown} from 'antd';
const SubMenu = Menu.SubMenu;

// 二维码地址
const qrcode = (<img src='http://www.raodaor.com/images/weixin.jpg' />);

// 获取用户cookie信息
const getUser = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent("remember").replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;

// 用户的下拉菜单
const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="my.html">个人中心</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="favorite.html">我的收藏</a>
    </Menu.Item>
    <Menu.Item key="2">
      <a href="mylist.html">我发布的信息</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3"><a href="logout.html">退出</a></Menu.Item>
  </Menu>
);

// 显示登录状态
const userHtml = getUser?(<Dropdown overlay={menu} trigger={['click']}>
    <a className="ant-dropdown-link" href="#" title={getUser.split('|')[1]}>
      <Icon type="solution" />{getUser.split('|')[1].substring(0, 5)}<Icon type="down" />
    </a>
  </Dropdown>):(<a href="signup.html"><Icon type="environment-o" />&nbsp;注册</a>);

const UA=navigator.userAgent.toLowerCase();
// 顶部菜单列表
const TopMenu = React.createClass({
  getInitialState() {
    return {
      current: window.location.pathname.substring(window.location.pathname.lastIndexOf("/")+1).substring(0, window.location.pathname.indexOf(".")-1)
    };
  },
  handleClick(e) {
    this.setState({
      current: e.key
    });
  },
  render() {
    return (
    (UA.indexOf('android') != -1 || UA.indexOf('iphone') != -1 || UA.indexOf('ipad') != -1)?(
            <Menu onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                style={{ width: "100%" }}
                mode="inline">
                <SubMenu key="sub1" title={<span><Icon type="appstore-o" /><span>菜单</span></span>}>
                  <Menu.Item key="index">
                      <a href="index.html"><Icon type="notification" />&nbsp;公告</a>
                    </Menu.Item>
                    <Menu.Item key="car">
                      <a href="car.html"><Icon type="shopping-cart" />&nbsp;找车</a>
                    </Menu.Item>
                <Menu.Item key="people">
                      <a href="people.html"><Icon type="user" />&nbsp;找人</a>
                    </Menu.Item>
                <Menu.Item key="activity">
                      <a href="activity.html"><Icon type="team" />&nbsp;活动</a>
                    </Menu.Item>
                    <Menu.Item key="raodaor">
                      <a href="http://www.raodaor.com/" target="_blank"><Icon type="code" />&nbsp;程序员</a>
                    </Menu.Item>
                    <Menu.Item key="signup">
                      {userHtml}
                    </Menu.Item>
                    <Menu.Item key="release">
                      <a href="release.html" style={{color:"red", fontWeight:"bold"}}><Icon type="edit" />&nbsp;免费发布信息</a>
                    </Menu.Item>
                </SubMenu>
              </Menu>
          ):
          (
            <div className="topbg">
            <Menu style={{width:"1170px", margin:"0 auto"}} onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal">
            <Menu.Item key="logo" style={{fontSize:18,color:"#fff",paddingLeft:0}}>
              绕道儿拼车
            </Menu.Item>
            <Menu.Item key="index">
              <a href="index.html"><Icon type="notification" />&nbsp;公告</a>
            </Menu.Item>
            <Menu.Item key="car">
              <a href="car.html"><Icon type="shopping-cart" />&nbsp;找车</a>
            </Menu.Item>
        <Menu.Item key="people">
              <a href="people.html"><Icon type="user" />&nbsp;找人</a>
            </Menu.Item>
        <Menu.Item key="activity">
              <a href="activity.html"><Icon type="team" />&nbsp;活动</a>
            </Menu.Item>
            <Menu.Item key="buy">
              <a href="buy.html"><Icon type="pay-circle-o" />&nbsp;一元购</a>
            </Menu.Item>

            <SubMenu title={<a href="javascript:void(0);"><Icon type="heart-o" />&nbsp;关注我们</a>}>
                <Menu.Item key="qqqun">
                  <a href="http://jq.qq.com/?_wv=1027&k=2AnircM" target="_blank" title="点击链接加入群！QQ群：378038268"><Icon type="team" />加入【北京-河北拼车群（IT）】</a>
                </Menu.Item>
                <Menu.Item key="raodaor">
                  <a href="http://www.raodaor.com/" target="_blank"><Icon type="code" />&nbsp;拜访程序员</a>
                </Menu.Item>
                <Menu.Item key="mobile" id="MobileFlagNo">
                    <Popover placement="bottom" title="【美图+教程嗨翻天！】" content={qrcode} trigger="hover">
                      <a href="javascript:void(0)"><Icon type="qrcode" />&nbsp;微信订阅</a>
                    </Popover>  
                </Menu.Item>
            </SubMenu>            
            <Menu.Item key="signup">
              {userHtml}
            </Menu.Item>
            <Menu.Item key="release">
              <a href="release.html" style={{color:"red", fontWeight:"bold"}}><Icon type="edit" />&nbsp;免费发布信息</a>
            </Menu.Item>
            <Menu.Item key="searchbox" style={{paddingRight:0}}>
              <SearchBox placeholder="在 9951万条 拼车信息中搜索" style={{ width: 280}} />
            </Menu.Item>
          </Menu>
          </div>
      )
    );
  }
});

export default TopMenu;