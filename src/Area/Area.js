import React from 'react';
import './Area.css';

class Area extends React.Component {
	render(){
		var left = (this.props.x1 <= this.props.x2 ? this.props.x1: this.props.x2);
		var top = (this.props.y1 <= this.props.y2 ? this.props.y1: this.props.y2);
		var width = Math.abs(this.props.x2 - this.props.x1);
		var height = Math.abs(this.props.y2 - this.props.y1);
		var style = {
			left:left + 'px'
			, top:top + 'px'
			, width:width + 'px'
			, height:height + 'px'
		};

		const div =  (
			<div	className={
						'rect' + 
						(this.props.selected === true ? ' selected': '') + 
						(this.props.highlighted === true ? ' highlighted': '')
					} 
					style={style}>
			</div>
		);

		return(
			div
		);
	}
}

export default Area;