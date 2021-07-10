import React, { Component } from 'react';
import { connect } from 'react-redux';
import { remove } from '../actions/actions';
import { Link } from 'react-router-dom';

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
        this.setState({ isSaved: true });
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
                        to=""
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
        movies: state.myList
    }
};

const mapDispatchToProps = dispatch => ({
    removeFromMylist: (id) => dispatch({
        type: remove,
        payload: { 
            imdbIDForRemoveFromMylist: id 
        }
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);