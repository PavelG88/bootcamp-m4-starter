import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFromDatabase, startLoad, endLoad } from '../actions/actions';
import { getMoviesByNameFromIMDB } from '../fetch/fetchToIMDB';

import './SearchBox.css';

class SearchBox extends Component {
    state = {
        searchLine: ''
    }
    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
    }
    searchBoxSubmitHandler = (e) => {
        this.props.startLoadData('Movies');
        let data = new FormData(e.target);
        let keyWords = data.get('desired-movie');
        e.preventDefault();

        getMoviesByNameFromIMDB(keyWords)
            .then (response => response.json())
            .then (data => {
                this.props.endLoadData('Movies');
                this.props.addFilmsFromDatabase(data.Search);
            })
            .catch (error => {
                console.log(`Произошла ошибка: ${error}`);
                this.props.endLoadData('Movies');
                return null;
            });     
    }

    render() {
        const { searchLine } = this.state;

        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                        Искать фильм по названию:
                        <input
                            value={searchLine}
                            type="text"
                            className="search-box__form-input"
                            placeholder="Например, Shawshank Redemption"
                            onChange={this.searchLineChangeHandler}
                            name="desired-movie"
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!searchLine}
                    >
                        Искать
                    </button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = dispatch => ({
    addFilmsFromDatabase: (movies) => dispatch ({
        type: addFromDatabase,
        payload: movies
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);