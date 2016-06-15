import React from 'react';
import reqwest from 'reqwest';
import { Button, Form, Input, message, Radio,InputNumber, Cascader, Upload, Icon } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

function noop() {
  return false;
}

// 获取用户cookie信息
const getUser = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent("remember").replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;

// 生成图片的唯一id
let singleHeadName = "";
function guid(){
      var e = (new Date).getTime();
      singleHeadName = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
                  var r, n;
                  return r = (e + 16 * Math.random()) % 16 | 0,
                  e = Math.floor(e / 16),
                  n = "x" === t ? r : 3 & r | 8,
                  n.toString(16)
              });
      return {"guid": singleHeadName}
}

class SigninForm extends React.Component {

      componentDidMount() {
        if(!!getUser){
              reqwest({
                url: '/getUserInfoById',
                method: 'post',
                data: {"userid":getUser.split('|')[0]},
                type: 'json',
                success:(res) => {
                  if(res.state=="ok" && !!res.result){
                    let result = res.result;
                    // 生成图片列表默认值
                    let photolist = [];
                    if (Array.isArray(result.uphoto)) {
                      for(let i=0,len=result.uphoto.length; i<len;i++){
                        photolist.push({
                              "uid": -i,
                              "status":"done", 
                              "name": result.uphoto[i].substring(result.uphoto[i].lastIndexOf('-')+1), 
                              "url": '/uploads/'+result.uphoto[i],
                              "thumbUrl": '/uploads/'+result.uphoto[i],
                              "response":{"name":result.uphoto[i]}
                            }
                        );
                      }
                    };
                    // 初始化表单数据
                    this.props.form.setFieldsValue({
                        ismodify: 1, // 表示当前是修改
                        name: result.uname,
                        passwd: result.upass,
                        utype: result.utype,
                        gender: (result.ugender?"1":"2"),
                        email: result.uemail,
                        sign: result.usign,
                        fullname: result.ufullname,
                        qq: result.uqq,
                        phone: result.uphone,
                        work: result.uwork.split('-'),
                        home: result.uhome.split('-'),
                        head: [{
                              "uid": -1,
                              "status":"done", 
                              "name": result.uhead.substring(result.uhead.lastIndexOf('-')+1), 
                              "url": '/uploads/'+result.uhead,
                              "thumbUrl": '/uploads/'+result.uhead,
                              "response":{"name":result.uhead}
                            }],
                        photo: photolist
                      });
                  }else{
                     message.warning("获取用户信息失败");
                  }
                }
              });
          }
      }

	 // 验证表单
	getValidateStatus(field) {
		    const { isFieldValidating, getFieldError, getFieldValue } = this.props.form;

		    if (isFieldValidating(field)) {
		      return 'validating';
		    } else if (!!getFieldError(field)) {
		      return 'error';
		    } else if (getFieldValue(field)) {
		      return 'success';
		    }
	  }

	  handleReset(e) {
	    e.preventDefault();
	    this.props.form.resetFields();
	  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        message.error('请认真填写！');
        return;
      }

      values.work=values.work.join('-');
      values.home=values.home.join('-');
      if(values.head && values.head.length>0 && values.head[0].response){
        values.head = values.head[0].response.name;
      }
      if(values.photo && values.photo.length>0 && values.photo[0].response){
        let temp = [];
        for(let i=0,len=values.photo.length;i<len;i++){
          temp.push(values.photo[i].response.name);
        }
        values.photo = temp.join('|');
      }

      reqwest({
	url: '/signup',
	method: 'post',
	data: values,
	type: 'json',
	//crossOrigin: true,
	//withCredentials: true,
	success:(result) => {
		if(result.state=="ok"){
                  if(getUser){
                    message.success("修改成功！");
                  }else{
                    window.location.href="signin.html";
                  }
		}else{
			message.error(result.error);
		}
	}
      });
    });
  }

  userExists(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      if(getUser && getUser.split('|')[1]==value){
        callback();
      }else{
        	reqwest({
      		url: '/existByName',
      		method: 'post',
      		data: {"username": value},
      		type: 'json',
      		success:(result) => {
      			if(result.state=="fail"){
      				callback([new Error('抱歉，该用户名已被占用。')]);
      			}else{
      				callback();
      			}
      		}
      	});
      }
    }
  }

  checkPass(rule, value, callback) {
    const { validateFields } = this.props.form;
    if (value) {
      validateFields(['rePasswd']);
    }
    callback();
  }

  checkPass2(rule, value, callback) {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('passwd')) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  }

// 单张图片
  normFile(e) {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList.slice(e.fileList.length-1,e.fileList.length); // 只取最后一次上传的图片。
  }

// 多张图片，最多10张
  normFile2(e) {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList.slice(e.fileList.length-10,e.fileList.length); // 只取最后一次上传的图片。
  }
  render() {
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const nameProps = getFieldProps('name', {
      rules: [
        { required: true, min: 5, message: '用户名至少为 5 个字符'},
        { validator: this.userExists }
      ],
    });
    const emailProps = getFieldProps('email', {
      validate: [{
        rules: [
          { required: true, message: '请填写你的邮箱地址'},
        ],
        trigger: 'onBlur',
      }, {
        rules: [
          { type: 'email', message: '请输入正确的邮箱地址' },
        ],
        trigger: ['onBlur', 'onChange'],
      }]
    });
    const passwdProps = getFieldProps('passwd', {
      rules: [
        { required: true, min:5, whitespace: true, message: '密码至少为 5 个字符' },
        { validator: this.checkPass.bind(this) },
      ],
    });
    const rePasswdProps = getFieldProps('rePasswd', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请再次输入密码',
      }, {
        validator: this.checkPass2.bind(this),
      }],
    });
    const textareaProps = getFieldProps('sign', {
      rules: [
        { required: true, message: '真的不打算写点什么吗？' },
      ],
    });
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };

    const workProps = getFieldProps('work', {
      rules: [{ required: true, type: 'array', message: '请选择工作地' }],
    });

    const homeProps = getFieldProps('home', {
      rules: [{ required: true, type: 'array', message: '请选择节假日回家地' }],
    });

const address = [{
      value: '北京市',
      label: '北京市',
      children: [{value:'东城区', label:'东城区'},{value:'西城区', label:'西城区'},{value:'崇文区', label:'崇文区'},{value:'宣武区', label:'宣武区'},{value:'朝阳区', label:'朝阳区'},{value:'丰台区', label:'丰台区'},{value:'石景山区', label:'石景山区'},{value:'海淀区', label:'海淀区'},{value:'门头沟区', label:'门头沟区'},{value:'房山区', label:'房山区'},{value:'通州区', label:'通州区'},{value:'顺义区', label:'顺义区'},{value:'昌平区', label:'昌平区'},{value:'大兴区', label:'大兴区'},{value:'怀柔区', label:'怀柔区'},{value:'平谷区', label:'平谷区'}]
    }, {
      value: '保定市',
      label: '保定市',
      children: [{value:'白沟镇', label:'白沟镇'},{value:'容城县', label:'容城县'},{value:'雄县', label:'雄县'},{value:'涿州市', label:'涿州市'},{value:'高碑店市', label:'高碑店市'},{value:'定兴县', label:'定兴县'},{value:'定州市', label:'定州市'},{value:'徐水区', label:'徐水区'},{value:'涞水县', label:'涞水县'},{value:'阜平县', label:'阜平县'},{value:'唐县', label:'唐县'},{value:'高阳县', label:'高阳县'},{value:'涞源县', label:'涞源县'},{value:'望都县', label:'望都县'},{value:'安新县', label:'安新县'},{value:'易县', label:'易县'}]
    }, {
      value: '中国',
      label: '中国',
      children: [{value:'台湾省', label:'台湾省'}, {value:'澳门', label:'澳门'}, {value:'香港', label:'香港'}]
    }];

    return (
      <Form horizontal form={this.props.form}>
        <FormItem
        {...formItemLayout}
        label=" ">
        <Input type="hidden" {...getFieldProps('ismodify')} />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="用户名："
          hasFeedback
          help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}>
          <Input disabled={getUser?true:false} {...nameProps} placeholder="请输入你的昵称" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="您的性别：">
          <RadioGroup {...getFieldProps('gender', { initialValue: '1' })}>
            <Radio value="1">男的</Radio>
            <Radio value="2">女的</Radio>
          </RadioGroup>
        </FormItem>

        <FormItem
        	      {...formItemLayout}
        	      label="注册类型：">
	          <RadioGroup {...getFieldProps('utype', { initialValue: '2' })}>
	            <Radio value="2">车主</Radio>
	            <Radio value="3">乘客</Radio>
	          </RadioGroup>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="邮箱："
          hasFeedback>
          <Input {...emailProps} type="email" placeholder="请输入你的邮箱地址" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="密码："
          hasFeedback>
          <Input {...passwdProps} type="password" autoComplete="off"
            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="确认密码："
          hasFeedback>
          <Input {...rePasswdProps} type="password" autoComplete="off" placeholder="两次输入密码保持一致"
            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="签名：">
          <Input {...textareaProps} type="textarea" placeholder="随便写，比如：我途径的路线等" id="sign" name="sign" />
        </FormItem>

        <FormItem
	      {...formItemLayout}
	      label="工作地：">
	      <Cascader options={address} {...workProps} id="work" name="work" />
          </FormItem>

          <FormItem
	      {...formItemLayout}
	      label="居住地：">
	      <Cascader options={address} {...homeProps} id="home" name="home" />
          </FormItem>

        <FormItem
	      {...formItemLayout}
	      label="真实姓名：">
	      <Input placeholder="真实平台，安全大家" {...getFieldProps('fullname')} />
          </FormItem>
          <FormItem
	      {...formItemLayout}
	      label="QQ：">
	      <InputNumber min={10000} max={9999999999} size="large" style={{width:"100%"}}  {...getFieldProps('qq')} />
          </FormItem>

          <FormItem
	      {...formItemLayout}
	      label="手机号：">
	      <Input placeholder="请填写真实的电话号码，以便别人找到你" {...getFieldProps('phone')} />
          </FormItem>

          <FormItem
          label="头像："
          {...formItemLayout}
          help="请上传素颜照，以便面部扫描识别！">
            <Upload name="head" action="/upload" accept="image/*" 
              data={guid} 
            listType="picture"
            {...getFieldProps('head', {
              valuePropName: 'fileList',
              normalize: this.normFile
            })}
          >
            <Button type="ghost">
              <Icon type="upload" /> 点击上传
            </Button>
          </Upload>
        </FormItem>

        <FormItem
          label="生活照："
          {...formItemLayout}
          help="方便大家了解你的全貌，可以风景、写真、剧照等等。可以一次多选10张照片。">
            <Upload name="photo" action="/upload" multiple={true} accept="image/*" 
              data={guid} 
            listType="picture"
            {...getFieldProps('photo', {
              valuePropName: 'fileList',
              normalize: this.normFile2
            })}
          >
            <Button type="ghost">
              <Icon type="upload" /> 点击上传
            </Button>
          </Upload>
        </FormItem>

        <FormItem wrapperCol={{ span: 12, offset: 7 }}>
          <Button type="primary" onClick={this.handleSubmit.bind(this)}>提交</Button>
          &nbsp;&nbsp;&nbsp;
          <Button type="ghost" onClick={this.handleReset.bind(this)}>重置</Button>
        </FormItem>
      </Form>
    );
  }
}

SigninForm = createForm()(SigninForm);

export default SigninForm;