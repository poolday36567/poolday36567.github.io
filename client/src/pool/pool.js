import React from 'react';
import './pool.css';

class Pool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            apiResponse: '',
            lat: 38.992460,
            lon: -77.099580,
        }
        this.getData = this.getData.bind(this);
        this.success = this.success.bind(this);
        this.getUserLocation = this.getUserLocation.bind(this);
    }
    success(pos) {
        var crd = pos.coords;
        this.setState({
            lat: crd.latitude,
            lon: crd.longitude
        });
    }
    getUserLocation () {
        let options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
          
        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }
          
        navigator.geolocation.getCurrentPosition(this.success, error, options);
    }
    getData() {
        if (this.state.counter < 1) {
            this.getUserLocation();
            fetch(`https://damp-everglades-29730.herokuapp.com/pool?lat=${this.state.lat}&lon=${this.state.lon}`)
            .then(response => response.text())
            .then(data => {
                if (data === 'true') this.setState({ apiResponse: 'Today Is a Good Pool Day', counter: 1 })
                else this.setState({ apiResponse: 'Today Isn\'t a Good Pool Day', counter: 1 })
            });
        }
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