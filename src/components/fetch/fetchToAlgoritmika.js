const url='https://acb-api.algoritmika.org/api/movies/list';

export const postMylistToDatabase = async(dataForSave) => {
    if(!url || !dataForSave) {
        throw 'Незаполнены параметры запроса';
    }

    let idOfMylist = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(dataForSave)    
    });
    idOfMylist = await idOfMylist.json();
    
    return idOfMylist;
}

export const getMylistFromDatabase = async(id) => {
    if(!url || !id) {
        throw 'Незаполнены параметры запроса';
    }

    let imdbIdes = await fetch(`${url}/${id}`);
    imdbIdes = await imdbIdes.json();

    return imdbIdes;
} 