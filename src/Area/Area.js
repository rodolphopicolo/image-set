import React from 'react';
import './Area.css';

class Area extends React.Component {
	render(){
		var left = (this.props.x1 <= this.props.x2 ? this.props.x1: this.props.x2);
		var top = (this.props.y1 <= this.props.y2 ? this.props.y1: this.props.y2);
		var width = Math.abs(this.props.x2 - this.props.x1);
		var height = Math.abs(this.props.y2 - this.props.y1);

		var points = this.props.points.slice();

		// points.sort((p1, p2)=>{
		// 	if(p1.x !== p2.x){
		// 		return p1.x - p2.x;
		// 	}
		// 	return p2.y - p1.y;
		// });

		// var sortedPoints = [points[0]];
		// points.pop(0);
		// while(points.length > 0){
		// 	console.log('points: ' + points);
		// 	for(var i = 0; i < points.length; i++){
		// 		if(points[i].y >= sortedPoints[0].y){
		// 			sortedPoints.push(points[i]);
		// 			points.pop(i);
		// 			i--;
		// 		}
		// 	}
		// 	for(var i = points.length - 1; i >= 0; i--){
		// 		sortedPoints.push(points[i]);
		// 		points.pop(i);
		// 		i++;
		// 	}
		// }

		// points = sortedPoints;


		var polyPoints = '';
		for(var i = 0; i < points.length; i++){
			polyPoints = polyPoints + (i > 0 ? ' ' : '') + points[i].x + ',' + points[i].y;
		}

		console.log(polyPoints);

		const div =  (
				<polygon	className={
								'area' + 
								(this.props.selected === true ? ' selected': '') + 
								(this.props.highlighted === true ? ' highlighted': '')
							}
							points={polyPoints} 
				/>
		);

		return(
			div
		);
	}
}

export default Area;