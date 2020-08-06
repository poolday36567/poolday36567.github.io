import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Title from './title/title';
import Pool from './pool/pool';
import Weather from './weather/weather';

ReactDOM.render(
    <div id='container'>
        <Title />
        <Pool />
        <Weather />
    </div>, 
    document.getElementById('root')
);