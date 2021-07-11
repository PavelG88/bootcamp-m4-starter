const url = 'http://www.omdbapi.com/?';
const apiKey = '6364c4d3';

export const getMoviesByNameFromIMDB = async(keyWords) => {
    if(!url || !apiKey || !keyWords) {
        throw 'Незаполнены параметры запроса';
    }
    let movies = await fetch(`${url}s=${keyWords}&apikey=${apiKey}`);
    movies = await movies.json();
    return movies;
}

export const getMoviesByIdFromIMDB = async(id) => {
    if(!url || !apiKey || !id) {
        throw 'Незаполнены параметры запроса';
    }

    let movies = await fetch(`${url}i=${id}&apikey=${apiKey}`);
    movies = await movies.json();
    return movies;
}