import React, { Component } from 'react';
import { connect } from 'react-redux';
import { add } from '../actions/actions';

import './MovieItem.css';

class MovieItem extends Component {
    render() {
        const { imdbID, Title, Year, Poster } = this.props;
        // console.log(this.props);
        // console.log(Title, Year, Poster);
        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    <button type="button" className="movie-item__add-button" onClick={() => this.props.addToMylist(imdbID)}>Добавить в список</button>
                </div>
            </article>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = dispatch => ({
    addToMylist: (id)  => dispatch({
        type: add,
        payload: { 
            imdbIDToAddToMylist: id 
        }
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieItem);