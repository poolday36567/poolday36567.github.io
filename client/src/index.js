import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Title from './title/title';
import Pool from './pool/pool';
import Weather from './weather/weather';
import Footer from './footer/footer';

ReactDOM.render(
    <div id='container'>
        <Title />
        <Pool />
        <Weather />
        <Footer />
    </div>, 
    document.getElementById('root')
);