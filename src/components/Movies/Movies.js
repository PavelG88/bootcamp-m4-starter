import React, { Component } from 'react';
import MovieItem from '../MovieItem/MovieItem';
import Preloader from '../Preloader/Preloader';
import { connect } from 'react-redux';

import './Movies.css';

class Movies extends Component {
    // state = { 
    //     movies: [
    //         {
    //             imdbID: 'tt3896198',
    //             title: "Guardians of the Galaxy Vol. 2",
    //             year: 2017,
    //             poster: "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg"

    //         },
    //         {
    //             imdbID: 'tt0068646',
    //             title: "The Godfather",
    //             year: 1972,
    //             poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"

    //         }
    //     ]
    // }
    render() { 
        if(this.props.isLoading.includes('Movies')) {
            return (
                <Preloader />
            );
        } else {
            return ( 
                <ul className="movies">
                    {this.props.films.map((movie) => (
                        <li className="movies__item" key={movie.imdbID}>
                            {/* <p>{movie.imdbID}</p> */}
                            <MovieItem {...movie} />
                        </li>
                    ))}
                </ul>
            );
        }
    }
}
 
const mapStateToProps = (state) => {
    return {
        films: state.movies,
        isLoading: state.isLoading
    }
};

export default connect(mapStateToProps)(Movies);