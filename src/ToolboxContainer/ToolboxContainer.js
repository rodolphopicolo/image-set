import React from 'react';
import './ToolboxContainer.css';

const PARENT_TOP = 0;

const WIDTH = 500;
const RIGHT_MARGIN = 32;
const TOP_MARGIN = 32;
const BOTTON_MARGIN = 32;

class ToolboxContainer extends React.Component {

	constructor(props){
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.handleMouseOver = this.handleMouseOver.bind(this);
		this.handleMouseOut = this.handleMouseOut.bind(this);
		this.handleExport = this.handleExport.bind(this);
		this.state = {selected:null, highlighted:null, areas: this.props.areas};
	}

	handleClick(key){
		this.setState({selected:key})
		this.props.onClickOverAreaDefinition(key);
	}

	handleMouseOver(key){
		this.setState({highlighted:key})
		this.props.onMouseOverAreaDefinition(key);
	}

	handleMouseOut(key){
		this.setState({highlighted:null})
		this.props.onMouseOutAreaDefinition(key);
	}

	handleLabelChange(key, e){
		var label = e.target.value;
		var areas = this.state.areas;
		for(var i = 0; i < areas.length; i++){
			if(areas[i].key === key){
				areas[i].label = label;
			}
		}
		this.setState({areas:areas});
	}


	handleExport(){
		var exported = JSON.stringify(this.state.areas);
		this.setState({exported:exported})
	}

    render() {

		const left = this.props.parentWidth - WIDTH - RIGHT_MARGIN;
		const top = PARENT_TOP + TOP_MARGIN;
		const width = WIDTH;
		const height = this.props.parentHeight - TOP_MARGIN - BOTTON_MARGIN;

		const style  = {
			left:left + 'px'
			, top:top + 'px'
			, width:width + 'px'
			, height:height + 'px'
		};

		var areasToRend = [];
		var areas = this.state.areas;
		for(var i = areas.length - 1; i >= 0 ; i--){
			var area = areas[i];
			var key = area.key;
			var areaToRend;


			areaToRend = (
				<div	key={key} 
						className={	'areaDefinition' + 
									(this.state.selected !== null && this.state.selected === key ? ' selected' : '') + 
									(this.state.highlighted !== null && this.state.highlighted === key ? ' highlighted' : '')
								}
						onClick={this.handleClick.bind(this, key)} 
						onMouseOver={this.handleMouseOver.bind(this, key)} 
						onMouseOut={this.handleMouseOut.bind(this, key)}>
					<span>key:{area.key}, {area.points.join()}</span>

					<select onChange={this.handleLabelChange.bind(this, key)}>
						<option value=""></option>
						<option value="label">Label</option>
						<option value="new image">New Image</option>
					</select>
				</div>
			);
			
			areasToRend.push(areaToRend);
		}

        return (
            <div id="toolbox-container" style={style}>
            	<div id="areas-definition-container">
            		{areasToRend}
            	</div>
            	<div>
            		<button type="button" value="export" onClick={this.handleExport}>export</button>
            	</div>
            	<div className="exportedContainer">
            		{this.state.exported}
            	</div>
            </div>
        );
    };
}

export default ToolboxContainer;