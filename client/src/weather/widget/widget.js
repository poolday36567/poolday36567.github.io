import React from 'react';
import './widget.css';

class Widget extends React.Component {
    render() {
        return (
            <div className='widget'>
                <div className='top'>
                    <p className='primary'>{this.props.primary}</p>
                    <p className='secondary'>{this.props.secondary}</p>
                    <p className='secondary'>{this.props.secondary2}</p>
                </div>
                <div className='bottom'>
                    <p className='other'>{this.props.other1}</p>
                    <p className='other'>{this.props.other2}</p>
                </div>
            </div>
        );
    }
}

export default Widget;