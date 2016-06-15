import React from 'react';
import { Card, Button, message, Icon, Badge } from 'antd';
const ButtonGroup = Button.Group;

import reqwest from 'reqwest';


let getUser = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent("remember").replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;

const IDCard = React.createClass({
  getInitialState(){
    return {
      show: false,
      top:0,
      down:0,
      info: {"_id":"0001","uname":"***","ugender":true,"usign":"***","uqq":"***","uphone":"***","uhead":"default.jpg"}
    };
  },
  componentWillMount: function () {
    let touser = this.props.touser;
    if(touser!="null"){
       this.setState({show: true});
        if(!this.props.data){
              reqwest({
                url: '/getUserInfoById',
                method: 'post',
                data:{"userid": touser, "smallinfo": true},
                type: 'json',
                success:(result) => {
                  if(result.state=="ok"){
                    this.setState({info: result.result, top: result.top, down: result.down});
                  }
                }
              });
            }else{
              this.setState({info: this.props.data})
            }
        }
  },
  setTopDown(t){
    if(getUser){
      let flag=(t==2 ? 2 : 1);
      reqwest({
        url: '/topdown',
        method: 'post',
        data:{"top":flag==1?1:0, "down":flag==2?1:0, "_touser": this.props.touser},
        type: 'json',
        success:(result) => {
          if(result.state=="ok"){
            message.success("太棒了，你成功戳到了TA！！！"); 
          }else{
            message.error(result.error);              
          }
        }
      });
    }else{
      message.error("请先登录哟！");  
    }
  },
  setDownTop(){
    this.setTopDown(2);
  },
  render() {
    return (
          <Card style={{display:(this.state.show?"block":"none"),width:"280",textAlign:"center"}} bodyStyle={{ padding: 0 }}>
              <div className="custom-image">
                <img alt={this.state.info.uname} height="50px" src={"/uploads/"+this.state.info.uhead} />
              </div>
              <div className="custom-card">
                <h3>{this.state.info.uname}&nbsp;<span className={this.state.info.ugender?"boysex":"girlsex"}></span></h3>
                <h4>联系方式：</h4>
                <div>QQ：{this.state.info.uqq} <br />&nbsp;&nbsp;<Icon type="phone" />：{this.state.info.uphone}</div>
                <h4>签名：</h4>
                <div>{this.state.info.usign}</div>
                <h4>我要戳TA：</h4>
                <div><br />
              <ButtonGroup size="large">
                <Badge count={this.state.top} overflowCount={999}>
                  <Button type="primary" onClick={this.setTopDown}><Icon type="like" />顶顶顶</Button>
                 </Badge>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <Badge count={this.state.down} overflowCount={999}>
                  <Button onClick={this.setDownTop}><Icon type="dislike" />踩踩踩</Button>
                  </Badge>
              </ButtonGroup>
                  </div>
                  <a href="javascript:void(0)">我要投诉TA</a>
              </div>
          </Card>
    );
  },
});

IDCard.propTypes = {
  touser: React.PropTypes.string.isRequired,
  data: React.PropTypes.object
}

export default IDCard;