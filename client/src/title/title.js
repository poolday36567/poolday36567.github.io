import React from 'react';
import './title.css';

class Title extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: '',
			counter: 0
		};
		this.getDate = this.getDate.bind(this);
	}
	getDate () {
		if (this.state.counter < 1) {
			let d = new Date();
			this.setState({
				date: `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`,
				counter: 1
			});
		}
	}
	render() {
		this.getDate();
		return(
            <div className='title'>
			    <h1>Is {this.state.date} a Good Pool Day?</h1>
            </div>
		);
	}
}

export default Title;