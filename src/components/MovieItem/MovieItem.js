import React, { Component } from 'react';
import { connect } from 'react-redux';
import { add, showMoreDetailsMovie, startLoad, endLoad } from '../actions/actions';
import { getMoviesByIdFromIMDB } from '../fetch/fetchToIMDB';
import './MovieItem.css';

class MovieItem extends Component {
    
    showDetails = (e) => {
        this.props.startLoadData('MoreDetails');
        getMoviesByIdFromIMDB(this.props.imdbID)
            .then(data => {
                // console.log(data);
                this.props.showMoreDetails(data, 'MoreDetails');
                this.props.endLoadData('MoreDetails');
            })
            .catch(error => {
                console.log("Ошибка получения данных: " + error);
                this.props.showMoreDetails({Title: "Что-то пошло не так, попробуйте позже."});
                this.props.endLoadData('MoreDetails');
            });
    }

    render() {
        const { imdbID, Title, Year, Poster } = this.props;
        // console.log(this.props);
        // console.log(Title, Year, Poster);
        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title} ({Year})</h3>
                    <button type="button" className="movie-item__more-button" onClick={this.showDetails}>Подробнее...</button>
                    <button type="button" className="movie-item__add-button" onClick={() => this.props.addToMylist(imdbID)} disabled={this.props.idOfMylistInBD}>Добавить в список</button>
                </div>
            </article>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies,
        idOfMylistInBD: state.idOfMylistInBD
    }
};

const mapDispatchToProps = dispatch => ({
    addToMylist: (id)  => dispatch({
        type: add,
        payload: { 
            imdbIDToAddToMylist: id 
        }
    }),
    showMoreDetails: (data, component) => dispatch({
        type: showMoreDetailsMovie,
        payload: { 
            dataAboutMovie: data,
            component: component
        }
    }),
    startLoadData: (component) => dispatch ({
        type: startLoad,
        payload: {
            component: component
        }
    }),
    endLoadData: (component) => dispatch ({
        type: endLoad,
        payload: {
            component: component
        }
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieItem);