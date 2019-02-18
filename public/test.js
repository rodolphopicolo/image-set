'use strict'

const e = React.createElement;

class Welcome extends React.Component{
	constructor(props){
		super(props);
		this.state = {name:props.name, count:0};

	}

	render(){
		return e('h1', {name: this.state.name, onClick: ()=>{this.setState({name:'inicializado' + this.state.count, count: this.state.count + 1}); console.log('oi: ' + this.state.count)}}, `Hello!!!! ${this.state.name}`);
	}
}


class App extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		var e1 = e('h1', {key:1, name:'abc'}, `Hello!!! ${this.props.name}, ${console.log(this.props)}`);
		var e2 = e('h1', {key:2, name:'def'}, 'Hello!!!');
		var e3 = e(Welcome, {key:3, name:'ghi'}, 'Hello!!!');

		var d1 = e('div', {}, [e1, e2, e3]);

		

		return d1;
	}
}

const domContainer = document.getElementById('root');
ReactDOM.render(e(App), domContainer);