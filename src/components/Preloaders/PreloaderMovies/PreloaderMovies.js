import React, { Component } from 'react';

import './PreloaderMovies.css';

class PreloaderMovies extends Component {
    render() {
        return(
            <div className="preloader">
                <span className="preloader__text">L</span>
                <img className="preloader__img" src="/img/preloader.svg" alt="preloader" />
                <span className="preloader__text">ading</span>
            </div>
        );
    }
}

export default PreloaderMovies;