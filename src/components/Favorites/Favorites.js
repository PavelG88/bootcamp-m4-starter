import React, { Component } from 'react';
import { connect } from 'react-redux';
import { remove, addInfoMylist, clearMylist } from '../actions/actions';
import { Link } from 'react-router-dom';
import { postMylistToDatabase } from '../fetch/fetchToAlgoritmika'

import './Favorites.css';

class Favorites extends Component {
    state = {
        title: this.props.title
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
            .then(data => {
                this.props.addInfoOfMylist(data['id'], this.state.title);
            })
            .catch(error => console.log("Ошибка сохранения: " + error));
    }

    clearMylist = () => {
        this.props.clearMylist();
        this.setState({
            title: ''
        });
    }

    render() { 
        return (
            <div className="favorites">
                <input 
                    value={this.state.title} 
                    className="favorites__name" 
                    placeholder="Введите название списка" 
                    onChange={this.inputTitleChange} 
                    disabled={this.props.idOfMylistInBD} 
                />
                <ul className="favorites__list">
                    {this.props.movies.map((item) => {
                        return (
                            <li key={item.imdbID} className="favorites__list-items">
                                <div className="favorites__list-item-data">{item.Title} ({item.Year})</div> 
                                <button className="favorites__list-item-button" onClick={() => this.props.removeFromMylist(item.imdbID)} disabled={this.props.idOfMylistInBD}>X</button>
                            </li>
                        );
                    })}
                </ul>
                { !this.props.idOfMylistInBD ?
                    <>    
                        <button 
                            type="button" 
                            className="favorites__save" 
                            disabled={!this.state.title || this.props.movies.length === 0}
                            onClick={this.saveList}
                        >
                            Сохранить список
                        </button>
                        <button 
                            className="favorites__save" 
                            disabled={this.props.movies.length === 0}
                            onClick={this.clearMylist}
                        >
                            Очистить список
                        </button>
                    </>
                :
                    <>
                        <Link 
                            className="favorites__link" 
                            to={'/list/'+this.props.idOfMylistInBD}
                        >
                            Перейти к списку
                        </Link>
                        <div 
                            className="favorites__new-list" 
                            onClick={this.clearMylist}
                        >
                            Создать новый список
                        </div>
                    </>
                }   
            </div>
        );
    }
}
 
const mapStateToProps = (state) => {
    return {
        movies: state.myList,
        title: state.title,
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
    addInfoOfMylist: (id, title) => dispatch({
        type: addInfoMylist,
        payload: { 
            idInDB: id,
            titleMylist: title 
        }
    }),
    clearMylist: () => dispatch({
        type: clearMylist
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);