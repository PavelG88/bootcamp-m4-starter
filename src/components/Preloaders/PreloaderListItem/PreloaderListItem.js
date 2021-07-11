import React, { Component } from 'react';

import './PreloaderListItem.css';

class PreloaderListItem extends Component {
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

export default PreloaderListItem;