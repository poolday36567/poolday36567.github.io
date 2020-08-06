import React from 'react';
import './pool.css';

class Pool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            apiResponse: ''
        }
        this.getData = this.getData.bind(this);
    }
    getData() {
        fetch('https://damp-everglades-29730.herokuapp.com/pool')
        .then(response => response.text())
        .then(data => {
            console.log(data);
            if (this.state.counter < 1) {
                if (data === 'true') this.setState({ apiResponse: 'Today Is a Good Pool Day', counter: 1 })
                else this.setState({ apiResponse: 'Today Isn\'t a Good Pool Day', counter: 1 })
            }
        });
    }
    render() {
        this.getData();
        return (
            <div className='pool'>
                <p>{this.state.apiResponse}</p>
            </div>
        );
    }
}

export default Pool;