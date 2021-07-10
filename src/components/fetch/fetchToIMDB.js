const url = 'http://www.omdbapi.com/?';
const apiKey = '6364c4d3';

export const getMoviesByNameFromIMDB = async(keyWords) => {
    if(!url || !apiKey || !keyWords) {
        throw 'Незаполнены параметры запроса';
    }

    return await fetch(`${url}s=${keyWords}&apikey=${apiKey}`);
}

export const getMoviesByIdFromIMDB = async(id) => {
    if(!url || !apiKey || !id) {
        throw 'Незаполнены параметры запроса';
    }

    return await fetch(`${url}i=${id}&apikey=${apiKey}`);
}