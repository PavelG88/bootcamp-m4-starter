import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFromDatabase, startLoad, endLoad } from '../actions/actions';

import './SearchBox.css';

const url = 'http://www.omdbapi.com/?';
const apiKey = '6364c4d3';

class SearchBox extends Component {
    state = {
        searchLine: ''
    }
    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
    }
    searchBoxSubmitHandler = (e) => {
        this.props.startLoadData();
        let data = new FormData(e.target);
        let keyWords = data.get('desired-movie');
        fetch(`${url}s=${keyWords}&apikey=${apiKey}`)
            .then (response => response.json())
            .then (data => {
                this.props.endLoadData();
                this.props.addFilmsFromDatabase(data.Search);
            })
            .catch (error => {
                console.log(`Произошла ошибка: ${error}`);
                this.props.endLoadData();
                return null;
            });
        e.preventDefault();
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
    addFilmsFromDatabase: (films) => dispatch ({
        type: addFromDatabase,
        payload: films
    }),
    startLoadData: () => dispatch ({
        type: startLoad
    }),
    endLoadData: () => dispatch ({
        type: endLoad
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);