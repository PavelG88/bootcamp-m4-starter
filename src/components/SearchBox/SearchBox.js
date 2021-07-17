import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFromDatabase, startLoad, endLoad } from '../actions/actions';
import { getMoviesByNameFromIMDB } from '../fetch/fetchToIMDB';

import './SearchBox.css';

class SearchBox extends Component {
    state = {
        searchLine: '',
        isLatincaOrNum: true
    }
    searchLineChangeHandler = (e) => {
        let reg = new RegExp('^[a-zA-Z0-9]+$');
        if (!e.target.value) {
            this.setState({ 
                searchLine: '',
                isLatincaOrNum: true
            });
            return;
        }

        if (reg.test(e.target.value)) {
            this.setState({ 
                searchLine: e.target.value,
                isLatincaOrNum: true
            });
        } else {
            this.setState({ 
                isLatincaOrNum: false
            });
        }
        
    }
    searchBoxSubmitHandler = (e) => {
        this.props.startLoadData('Movies');
        // let data = new FormData(e.target);
        // let keyWords = data.get('desired-movie');
        e.preventDefault();

        getMoviesByNameFromIMDB(this.state.searchLine)
        .then (data => {
            this.props.endLoadData('Movies');
            this.props.addFilmsFromDatabase(data.Search);
            // console.log(data.Search);
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
                        {this.state.isLatincaOrNum ? 
                            <span className="search-box__error-input"></span>
                        :
                            <span className="search-box__error-input">* латинские буквы или цифры</span>
                        }
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