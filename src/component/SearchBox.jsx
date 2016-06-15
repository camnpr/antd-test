/*
* 搜索框，使用：<SearchBox placeholder="input search text" onSearch={value => console.log(value)} style={{ width: 200 }} />
*/
/*import React from 'react';
import { Input, Button } from 'antd';
import classNames from 'classnames';
const InputGroup = Input.Group;

const SearchBox = React.createClass({
  getInitialState() {
    return {
	value: '',
	focus: false,
    };
  },
  handleInputChange(e) {
    this.setState({
      value: e.target.value,
    });
  },
  handleFocusBlur(e) {
    this.setState({
      focus: e.target === document.activeElement,
    });
  },
  handleSearch() {
    if (this.props.onSearch) {
      this.props.onSearch(this.state.value);
    }
  },
  render() {
    const { style, size, ...restProps } = this.props;
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.state.value.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'ant-search-input-focus': this.state.focus,
    });
    return (
      <div className="ant-search-input-wrapper" style={style}>
        <InputGroup className={searchCls}>
          <Input {...restProps} value={this.state.value} onChange={this.handleInputChange}
            onFocus={this.handleFocusBlur} onBlur={this.handleFocusBlur} onPressEnter={this.handleSearch} />
          <div className="ant-input-group-wrap">
            <Button icon="search" className={btnCls} size={size} onClick={this.handleSearch} />
          </div>
        </InputGroup>
      </div>
    );
  },
});

export default SearchBox;*/

import React from 'react';
import { Input, Select, Button, Icon } from 'antd';
import classNames from 'classnames';
const Option = Select.Option;

import reqwest from 'reqwest';

let timeout;
let currentValue;

function fetch(value, callback) {
  if(value=="" && value =="+"){
      return;
  }

  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    reqwest({
      url: '/searchSuggest',
      method: 'GET',
      data: {"q": value},
      type: 'json',
      success:(result) => {
        const data = [];
        if(result.state=="ok"){
             result.result.forEach((r) => {
              data.push({
                value: r[1],
                text: r[0],
              });
            });
        }
        callback(data);
      }
    });
  }
  timeout = setTimeout(fake, 300);
}

const SearchBox = React.createClass({
  getInitialState() {
    return {
      data: [],
      value: '',
      focus: false,
    };
  },
  handleChange(value) {
    this.setState({ value });
    fetch(value, (data) => this.setState({ data }));
  },
  handleSubmit() {
    window.location.href="search.html?k="+this.state.value;
  },
  handleFocusBlur(e) {
    this.setState({
      focus: e.target === document.activeElement,
    });
  },
  render() {
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.state.value.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'ant-search-input-focus': this.state.focus,
    });
    const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
    return (
      <div className="ant-search-input-wrapper" style={this.props.style}>
        <Input.Group className={searchCls}>
          <Select
            combobox
            value={this.state.value}
            placeholder={this.props.placeholder}
            notFoundContent=""
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onChange={this.handleChange}
            onFocus={this.handleFocusBlur}
            onBlur={this.handleFocusBlur}>
            {options}
          </Select>
          <div className="ant-input-group-wrap">
            <Button className={btnCls} onClick={this.handleSubmit}>
              <Icon type="search" />
            </Button>
          </div>
        </Input.Group>
      </div>
    );
  },
});

export default SearchBox;