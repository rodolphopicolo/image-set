import React from 'react';
import './App.css';
import ImageContainer from './ImageContainer/ImageContainer';
import ToolboxContainer from './ToolboxContainer/ToolboxContainer';

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {width:0, height:0, areas:[], selectedArea:null};

        /*
        https://reactjs.org/docs/handling-events.html
        You have to be careful about the meaning of this in JSX callbacks. 
        In JavaScript, class methods are not bound by default. 
        If you forget to bind this.handleClick and pass it to onClick, 
        this will be undefined when the function is actually called.

        This is not React-specific behavior; it is a part of how functions work in JavaScript.
        Generally, if you refer to a method without () after it, 
        such as onClick={this.handleClick}, you should bind that method.
        */
        this.updateDimensions = this.updateDimensions.bind(this);
        this.handleNewArea = this.handleNewArea.bind(this);
        this.handleClickOverAreaDefinition = this.handleClickOverAreaDefinition.bind(this);
        this.handleMouseOverAreaDefinition = this.handleMouseOverAreaDefinition.bind(this);
        this.handleMouseOutAreaDefinition = this.handleMouseOutAreaDefinition.bind(this);
	}

    render() {
        return (
            <div>
                <ImageContainer parentWidth={this.state.width} parentHeight={this.state.height} onNewArea={this.handleNewArea} selectedArea={this.state.selectedArea} highlightedArea={this.state.highlightedArea}/>
                <ToolboxContainer parentWidth={this.state.width} parentHeight={this.state.height} areas={this.state.areas} onClickOverAreaDefinition={this.handleClickOverAreaDefinition} onMouseOverAreaDefinition={this.handleMouseOverAreaDefinition} onMouseOutAreaDefinition={this.handleMouseOutAreaDefinition}/>
            </div>
        );
    };

    handleNewArea(area){
        var areas = this.state.areas;
        areas.push(area);
        this.setState({areas:areas});
    }

    handleClickOverAreaDefinition(key){
        this.setState({selectedArea:key});
    }

    handleMouseOverAreaDefinition(key){
        this.setState({highlightedArea:key});
    }

    handleMouseOutAreaDefinition(){
        this.setState({highlightedArea:null});

    }

    updateDimensions() {

	    var w = window,
	        d = document,
	        documentElement = d.documentElement,
	        body = d.getElementsByTagName('body')[0],
	        width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
	        height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;

        this.setState({width: width, height: height});
        // if you are using ES2015 I'm pretty sure you can do this: this.setState({width, height});
    };

    componentWillMount() {
        this.updateDimensions();
    };

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    };

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    };
};

export default App;
