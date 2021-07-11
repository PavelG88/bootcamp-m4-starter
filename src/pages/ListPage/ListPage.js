import React, { Component } from 'react';
import { getMylistFromDatabase } from '../../components/fetch/fetchToAlgoritmika';
import { getMoviesByIdFromIMDB } from '../../components/fetch/fetchToIMDB';
import PreloaderListItem from '../../components/Preloaders/PreloaderListItem/PreloaderListItem';
import PreloaderList from '../../components/Preloaders/PreloaderList/PreloaderList';

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
            .then(data => {
                listImdbID = data["movies"];
                // console.log(listImdbID)
                // Запросы к серверу по всем imdbID
                this.getMoviesFromIMDB(listImdbID);
                this.props.endLoadData('ListPage');
            })
            .catch(error => {
                console.log("Ошибка сохранения: " + error);
                this.props.endLoadData('ListPage');
            });   
    }

    getMoviesFromIMDB  = (listImdbID) => {
        listImdbID.forEach( (imdbId) => {
            this.props.startLoadData(imdbId);
            getMoviesByIdFromIMDB(imdbId)
                .then(data => {
                    let listMovies = [...this.state.movies];
                    listMovies.push(data);
                    this.setState({ movies: listMovies });
                    this.props.endLoadData(imdbId);
                })
                .catch(error => {
                    console.log("Ошибка сохранения: " + error)
                    this.props.endLoadData(imdbId);
                });
        });
    }

    render() {
        if(this.props.isLoading.includes('ListPage')) {
            return (
                <div className="list-page">
                    <h1 className="list-page__title">Мой список</h1>
                    <PreloaderList />
                </div>
            );
        } else {
            return (
                <div className="list-page">
                    <h1 className="list-page__title">Мой список</h1>
                    <ul>
                        {this.state.movies.map((item) => {
                            if(this.props.isLoading.includes(item.imdbID)) {
                                return (
                                    <PreloaderListItem />
                                );
                            } else {
                                return (
                                    <li key={item.imdbID}>
                                        <a href={"https://www.imdb.com/title/"+item.imdbID} target="_blank">{item.Title} ({item.Year})</a>
                                    </li>
                                );
                            }
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