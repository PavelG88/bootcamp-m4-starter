import React, { Component } from 'react';
import { connect } from 'react-redux';
import { remove, addId } from '../actions/actions';
import { Link } from 'react-router-dom';
import { postMylistToDatabase } from '../fetch/fetchToAlgoritmika'

import './Favorites.css';

class Favorites extends Component {
    state = {
        title: '',
        isSaved: false
        // movies: [
        //     { imdbID: 'tt0068646', title: 'The Godfather', year: 1972 }
        // ]
    }
    
    inputTitleChange = (e) => {
        this.setState({ title: e.target.value });
    }

    saveList = (e) => {
        const dataForSave = this.getDataForSave();
        this.saveToDatabase(dataForSave);
    }

    getDataForSave = () => {
        const moviesImdbId = this.props.movies.map((movie) => {
            return movie.imdbID;
        })
        const data = {
            "title": this.state.title,
            "movies": moviesImdbId
        };
        return data;
    }

    saveToDatabase = (dataForSave) => {
        postMylistToDatabase(dataForSave)
            .then(response => response.json())
            .then(data => {
                this.props.addIdOfMylist(data['id']);
                this.setState({ isSaved: true });
            })
            .catch(error => console.log("Ошибка сохранения: " + error));
    }

    render() { 
        return (
            <div className="favorites">
                <input 
                    value={this.state.title} 
                    className="favorites__name" 
                    placeholder="Введите название списка" 
                    onChange={this.inputTitleChange} 
                    disabled={this.state.isSaved} 
                />
                <ul className="favorites__list">
                    {this.props.movies.map((item) => {
                        return (
                            <li key={item.imdbID} className="favorites__list-items">
                                <div className="favorites__list-item-data">{item.Title} ({item.Year})</div> 
                                <button className="favorites__list-item-button" onClick={() => this.props.removeFromMylist(item.imdbID)} disabled={this.state.isSaved}>X</button>
                            </li>
                        );
                    })}
                </ul>
                { !this.state.isSaved ?
                    <button 
                        type="button" 
                        className="favorites__save" 
                        disabled={!this.state.title || this.props.movies.length === 0}
                        onClick={this.saveList}
                    >
                        Сохранить список
                    </button>
                :
                    <Link 
                        className="favorites__link" 
                        to={'/list/'+this.props.idOfMylistInBD}
                    >
                        Перейти к списку
                    </Link>
                }   
            </div>
        );
    }
}
 
const mapStateToProps = (state) => {
    return {
        movies: state.myList,
        idOfMylistInBD: state.idOfMylistInBD
    }
};

const mapDispatchToProps = dispatch => ({
    removeFromMylist: (id) => dispatch({
        type: remove,
        payload: { 
            imdbIDForRemoveFromMylist: id 
        }
    }),
    addIdOfMylist: (id) => dispatch({
        type: addId,
        payload: { 
            idInDB: id 
        }
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);