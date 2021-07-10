const url='https://acb-api.algoritmika.org/api/movies/list';

export const postMylistToDatabase = async(dataForSave) => {
    if(!url || !dataForSave) {
        throw 'Незаполнены параметры запроса';
    }

    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(dataForSave)    
    });
}

export const getMylistFromDatabase = async(id) => {
    if(!url || !id) {
        throw 'Незаполнены параметры запроса';
    }

    return await fetch(`${url}/${id}`);
} 