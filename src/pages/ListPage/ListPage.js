import React, { Component } from 'react';
import { getMylistFromDatabase } from '../../components/fetch/fetchToAlgoritmika';
import { getMoviesByIdFromIMDB } from '../../components/fetch/fetchToIMDB';
import Preloader from '../../components/Preloader/Preloader';

import { connect } from 'react-redux';
import { startLoad, endLoad } from '../../components/actions/actions';

import './ListPage.css';

class ListPage extends Component {
    state = {
        movies: []
    }
    componentDidMount() {
        const id = this.props.match.params['id'];
        // console.log(id);
        this.props.startLoadData('ListPage');
        
        // Запросы к серверу алгоритмики
        let listImdbID = [];
        getMylistFromDatabase(id)
            .then(response => response.json())
            .then(data => {
                listImdbID = data["movies"];
                console.log(listImdbID)
                // Запросы к серверу по всем imdbID
                this.getMoviesFromIMDB(listImdbID);
            })
            .catch(error => console.log("Ошибка сохранения: " + error));   
    }

    getMoviesFromIMDB  = (listImdbID) => {
        let listMovies = [];

        // getMoviesByIdFromIMDB(listImdbID[0])
        //         .then(response => response.json())
        //         .then(data => {
        //             listMovies.push(data);
        //             console.log(listMovies);
        //             this.props.endLoadData('ListPage');   
        //             this.setState({ movies: listMovies });
        //         })
        //         .catch(error => {
        //             console.log("Ошибка сохранения: " + error)
        //             this.props.endLoadData('ListPage');
        //         });

        listImdbID.forEach( imdbId => {
            getMoviesByIdFromIMDB(imdbId)
                .then(response => response.json())
                .then(data => {
                    listMovies.push(data);
                })
                .catch(error => {
                    console.log("Ошибка сохранения: " + error)
                    this.props.endLoadData('ListPage');
                });
        });
        console.log(listMovies);
        this.props.endLoadData('ListPage');   
        this.setState({ movies: listMovies });
    }

    render() {
        if(this.props.isLoading.includes('ListPage')) {
            console.log('Preloader');
            return (
                <div className="list-page">
                    <h1 className="list-page__title">Мой список</h1>
                    <Preloader />
                </div>
            );
        } else { 
            console.log('List');
            console.log(this.state.movies);
            {this.state.movies.map((item) => {
                console.log(item);
                console.log(item.Title);
                console.log(item.Year);
                });
            }
            return (
                <div className="list-page">
                    <h1 className="list-page__title">Мой список</h1>
                    <ul>
                        {this.state.movies.map((item) => {
                            return (
                                <li key={item.imdbID}>
                                    <a href={"https://www.imdb.com/title/"+item.imdbID} target="_blank">{item.Title} ({item.Year})</a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        }
    }
}
 
const mapStateToProps = (state) => {
    return {
        isLoading: state.isLoading
    };
};

const mapDispatchToProps = dispatch => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);