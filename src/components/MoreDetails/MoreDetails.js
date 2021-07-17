import React, { Component } from 'react';
import { connect } from 'react-redux';

import { hideComponent } from '../actions/actions';
import Preloader from '../Preloader/Preloader';


import './MoreDetails.css';

class MoreDetails extends Component {

    render() {
        const { Actors, Awards, BoxOffice, Country, Director, Plot, Poster, Production, Released, Runtime, Title, Type, Writer, Year,  imdbRating} = this.props.movieDetails;
        return (
            <div 
                className={"more-details" + (this.props.componentsIsShowing.includes("MoreDetails") ? " visible" : " unvisible")}
            >
                {this.props.componentsIsLoading.includes("MoreDetails") ?
                    <Preloader />
                :    
                    <div className="more-details__wrapper">
                        <h3 className="more-details__title">{Title} ({Year})</h3>
                        <div className="more-details__wrapper-info">
                            <img className="more-details__poster" src={Poster} alt={Title} />
                            <div className="more-details__info">  
                                <ul>
                                    <li className="more-details__item">
                                        <div className="more-details__item-title">Описание:</div>
                                        <div className="more-details__item-value">{Plot}</div>
                                    </li>
                                    <li className="more-details__item">
                                        <div className="more-details__item-title">Продолжительность:</div>
                                        <div className="more-details__item-value">{Runtime}</div>
                                    </li>
                                    <li className="more-details__item">
                                        <div className="more-details__item-title">Дата выхода:</div>
                                        <div className="more-details__item-value">{Released}</div>
                                    </li>
                                    <li className="more-details__item">
                                        <div className="more-details__item-title">Страна:</div>
                                        <div className="more-details__item-value">{Country}</div>
                                    </li>
                                    <li className="more-details__item">
                                        <div className="more-details__item-title">Режисер:</div>
                                        <div className="more-details__item-value">{Director}</div>
                                    </li>
                                    <li className="more-details__item">
                                        <div className="more-details__item-title">Актеры:</div>
                                        <div className="more-details__item-value">{Actors}</div>
                                    </li>
                                    <li className="more-details__item">
                                        <div className="more-details__item-title">Сценаристы:</div>
                                        <div className="more-details__item-value">{Writer}</div>
                                    </li>
                                    <li className="more-details__item">
                                        <div className="more-details__item-title">Продюсеры:</div>
                                        <div className="more-details__item-value">{Production}</div>
                                    </li>
                                    <li className="more-details__item">
                                        <div className="more-details__item-title">Рейтинг IMDB:</div>
                                        <div className="more-details__item-value">{imdbRating}</div>
                                    </li>
                                    <li className="more-details__item">
                                        <div className="more-details__item-title">Бюджет:</div>
                                        <div className="more-details__item-value">{BoxOffice}</div>
                                    </li>
                                    <li className="more-details__item">
                                        <div className="more-details__item-title">Награды:</div>
                                        <div className="more-details__item-value">{Awards}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <button type="button" className="more-details-button" onClick={() => this.props.hide("MoreDetails")}>Скрыть</button>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        movieDetails: state.movieMoreDetails,
        componentsIsShowing: state.componentsIsShowing,
        componentsIsLoading: state.isLoading
    }
};

const mapDispatchToProps = dispatch => ({
    hide: (component)  => dispatch({
        type: hideComponent,
        payload: { 
            component: component 
        }
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(MoreDetails);