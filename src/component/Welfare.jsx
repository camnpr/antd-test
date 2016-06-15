/**
*@description 轮播广告
*/

import React from 'react';
import { Carousel } from 'antd';

const Welfare = React.createClass({
	render(){
		return <div>
				<Carousel dots="false" autoplay className="top-slick-slide">
				          <div><h3>方便出行</h3></div>
				          <div><h3>安全可靠</h3></div>
				</Carousel>
			</div>;
	}
});

export default Welfare;