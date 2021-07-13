import React, { Component } from 'react';
import { connect } from 'react-redux';
import { add } from '../actions/actions';

import './MovieItem.css';

class MovieItem extends Component {
    
    state = {
        isMoreDetails: false
    }
    
    showMoreDetails = (e) => {
        this.setState({ isMoreDetails: this.state.isMoreDetails ? false : true });
        console.log(this.props.movies);
    }

    render() {
        const { imdbID, Title, Year, Poster } = this.props;
        // console.log(this.props);
        // console.log(Title, Year, Poster);
        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    {this.state.isMoreDetails ?
                        <>
                            <div className="movie-item__more-details">Здесь могла быть более подробная информация о фильме {Title} или Ваша реклама</div>
                            <button type="button" className="movie-item__more-button" onClick={this.showMoreDetails}>Скрыть</button>
                        </>
                    :
                        <button type="button" className="movie-item__more-button" onClick={this.showMoreDetails}>Подробнее...</button>
                    }
                    <button type="button" className="movie-item__add-button" onClick={() => this.props.addToMylist(imdbID)}>Добавить в список</button>
                </div>
            </article>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies
    }
};

const mapDispatchToProps = dispatch => ({
    addToMylist: (id)  => dispatch({
        type: add,
        payload: { 
            imdbIDToAddToMylist: id 
        }
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieItem);