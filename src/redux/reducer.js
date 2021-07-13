import { addFromDatabase, add, remove, startLoad, endLoad, addId } from '../components/actions/actions';

let initialState = {
    myList: [],
    movies: [],
    isLoading: [],
    idOfMylistInBD: ''
}

/**
 * state = initialState - установка значения по умолчанию. Когда ничего не пердается
 */
function reducer(state = initialState, action) {
    
    if (action.type === addFromDatabase) { //Обновление списка найденных фильмов
        let updatedState = {...state};
        updatedState.movies = action.payload;
        return updatedState;

    } else if (action.type === add) {    //Добавление в список избранных фильмов
        if(state.myList.find( item => item.imdbID === action.payload.imdbIDToAddToMylist)){
            return state;
        };
        const movie = state.movies.find( item => item.imdbID === action.payload.imdbIDToAddToMylist);
        const updatedMyList = [...state.myList, movie];
        let updatedState = {...state};
        updatedState.myList = updatedMyList;
        return updatedState;

    } else if (action.type === remove) {    //Удаление из списка избранных фильмов
        const updatedMyList = state.myList.filter( item => item.imdbID !== action.payload.imdbIDForRemoveFromMylist);
        let updatedState = {...state};
        updatedState.myList = updatedMyList;
        return updatedState;

    } else if (action.type === startLoad) { //Начало загрузки данных с сервера, изменение статуса загрузки на true
        let updatedState = {...state};
        updatedState.isLoading = [ ...state.isLoading, action.payload.component];
        return updatedState;

    } else if (action.type === endLoad) {   //Окончание загрузки данных с сервера, изменение статуса загрузки на false
        const updatedIsLoading = state.isLoading.filter(item => item !== action.payload.component);
        let updatedState = {...state};
        updatedState.isLoading = updatedIsLoading;
        return updatedState;

    } else if (action.type === addId) {   //Добавление id сохраненного в БД списка избранных фильмов
        let updatedState = {...state};
        updatedState.idOfMylistInBD = action.payload.idInDB;
        return updatedState;
    }

    return state;
}

export default reducer;