import React from 'react';
import reqwest from 'reqwest';
import { Button, Form, Input, message, Radio,InputNumber, Cascader, Icon, DatePicker } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;

const disabledDate = function (current) {
  // can not select days after today
  return current && current.getTime() < new Date().setHours(-1);
};

function noop() {
  return false;
}

const getUser = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent("remember").replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;

class SigninForm extends React.Component {

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
    if(!getUser){
      message.warn('用户失效，请重新登录！');
      return;
    }

    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        message.error('请认真填写！');
        return;
      }

      values.from=values.from.join('-');
      values.to=values.to.join('-');

      values.starttime=new Date(values.time[0]).getTime();
      values.endtime=new Date(values.time[1]).getTime();
      values._user = getUser.split("|")[0];
      values.time="";

      reqwest({
	url: '/publish',
	method: 'post',
	data: values,
	type: 'json',
	success:(result) => {
		if(result.state=="ok"){
                  window.location.href="mylist.html";
		}else{
			message.error(result.error);
		}
	}
      });
    });
  }

  render() {
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const titleProps = getFieldProps('title', {
      rules: [
        { required: true, min: 6, message: '至少为 6 个字符'}
      ],
    });
    const timeProps = getFieldProps('time', {
      rules: [
        { required: true, type:"array", message: '选择有限期，方便你的信息一直是活跃的。' },
      ],
    });
    const remarkProps = getFieldProps('remark', {
      rules: [
        { required: true, message: '真的不打算写点什么吗？' },
      ],
    });
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };

    const fromProps = getFieldProps('from', {
      rules: [{ required: true, type: 'array', message: '请选择从哪里出发？' }],
    });

    const toProps = getFieldProps('to', {
      rules: [{ required: true, type: 'array', message: '请选择到哪里去？' }],
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
        label="标题：">
        <Input placeholder="比如：下午有到保定的吗？" {...titleProps} id="title" />
      </FormItem>

        <FormItem
        	      {...formItemLayout}
        	      label="发布类型：">
	          <RadioGroup {...getFieldProps('itype', { initialValue: '1' })}>
	            <Radio value="1">找车</Radio>
	            <Radio value="2">找人</Radio>
                  <Radio value="3">活动</Radio>
	          </RadioGroup>
        </FormItem>

        <FormItem
	      {...formItemLayout}
	      label="出发地：">
	      <Cascader options={address} {...fromProps} id="from" name="from" />
          </FormItem>

          <FormItem
	      {...formItemLayout}
	      label="目的地：">
	      <Cascader options={address} {...toProps} id="to" name="to" />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="价格：">
              <InputNumber min={0} max={50} defaultValue={35} size="large" {...getFieldProps('price')} />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="有限期：">
              <RangePicker disabledDate={disabledDate} showTime format="yyyy-MM-dd HH:mm:ss"  {...timeProps} id="time" name="time" />
          </FormItem>

          <FormItem
          {...formItemLayout}
          label="备注：">
          <Input {...remarkProps} type="textarea" style={{height:"100px"}} placeholder="随便写，比如：车找人，今天下班以后回容城，可路过徐水，大兴瀛海附近可接送谁回去？请电话微信联系我187xxxxxx18等" id="remark" name="remark" />
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