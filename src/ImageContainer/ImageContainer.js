import React from 'react';
import Area from '../Area/Area'
import './ImageContainer.css';

const PARENT_LEFT = 0;
const PARENT_TOP = 0;

const LEFT_MARGIN = 32;
const RIGHT_MARGIN = 32 + 500 + 32;
const TOP_MARGIN = 32;
const BOTTON_MARGIN = 32;

class ImageContainer extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			areas:[]
			, areasCounter:0
			, dragging:false
		};
		this.mouseDown = this.mouseDown.bind(this);
		this.mouseUp = this.mouseUp.bind(this);
		this.mouseMove = this.mouseMove.bind(this);
		this.onNewArea = this.onNewArea.bind(this);

	}

	onNewArea(area){
		this.props.onNewArea(area);
	}

	mouseDown(e){
		var x = e.clientX - (PARENT_LEFT + LEFT_MARGIN);
		var y = e.clientY - (PARENT_TOP + TOP_MARGIN);

		var area = {
			key: this.state.areasCounter
			, x1: x
			, y1: y
			, x2: x
			, y2: y
		};

		this.state.areas.push(area);
		this.setState({areas:this.state.areas, areasCounter:this.state.areasCounter + 1, dragging:true})
	}

	mouseUp(e){
		if(this.state.areas.length === 0){
			return;
		}

		var x2 = e.clientX - (PARENT_LEFT + LEFT_MARGIN);
		var y2 = e.clientY - (PARENT_TOP + TOP_MARGIN);

		var currentArea = this.state.areas[this.state.areas.length - 1];
		var x1 = currentArea.x1
		var y1 = currentArea.y1

		var area = {
			key: this.state.areasCounter
			, x1: x1
			, y1: y1
			, x2: x2
			, y2: y2
		};
		this.state.areas.pop();
		if(this.state.dragging !== true){
			return;
		}
		this.state.areas.push(area);
		this.setState({areas:this.state.areas, areasCounter:this.state.areasCounter + 1, dragging:false})
		this.onNewArea(area);
	}

	mouseOut(e){

	}

	mouseMove(e){
		if(this.state.areas.length === 0 || this.state.dragging !== true){
			return;
		}

		var x2 = e.clientX - (PARENT_LEFT + LEFT_MARGIN);
		var y2 = e.clientY - (PARENT_TOP + TOP_MARGIN);

		var currentArea = this.state.areas[this.state.areas.length - 1];
		var x1 = currentArea.x1
		var y1 = currentArea.y1

		var area = {
			key: this.state.areasCounter
			, x1: x1
			, y1: y1
			, x2: x2
			, y2: y2
		};
		this.state.areas.pop();
		this.state.areas.push(area);
		this.setState({areas:this.state.areas, areasCounter:this.state.areasCounter + 1})
	}


    render() {

		const left = PARENT_LEFT + LEFT_MARGIN;
		const top = PARENT_TOP + TOP_MARGIN;
		const width = this.props.parentWidth - LEFT_MARGIN - RIGHT_MARGIN;
		const height = this.props.parentHeight - TOP_MARGIN - BOTTON_MARGIN;

		const selectedArea = this.props.selectedArea;
		const highlightedArea = this.props.highlightedArea;


		const style  = {
			left:left + 'px'
			, top:top + 'px'
			, width:width + 'px'
			, height:height + 'px'
			, backgroundImage:'url(labels.jpg)'
			, backgroundSize:'800px'
		};

		var areasToRender = [];
		for(var i = 0; i < this.state.areas.length; i++){
			var area = this.state.areas[i];
			var areaToRender = (
				<Area	key={area.key} 
						x1={area.x1} 
						y1={area.y1} 
						x2={area.x2} 
						y2={area.y2} 
						selected={selectedArea != null && area.key === selectedArea ? true: false}
						highlighted={highlightedArea != null && area.key === highlightedArea ? true: false}
				/>
			)
			areasToRender.push(areaToRender)
		}


        return (
	    	<div	id="image-container" style={style} 
	    			onMouseDown={this.mouseDown}
	    			onMouseUp={this.mouseUp}
	    			onMouseOut={this.mouseOut}
	    			onMouseMove={this.mouseMove}>
	            {areasToRender}
	        </div>
        );
    };
}

export default ImageContainer;