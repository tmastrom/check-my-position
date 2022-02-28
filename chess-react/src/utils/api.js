import { domain } from './config';

const getGetOptions = () => {
    return {
        method: 'GET',
    }
}

const getPostOptions = (body) => {
    return {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    }
}


const nextMove = (position, successCallback, failureCallback) => {
    console.log('called analyze', position);
    fetch(domain + 'analyze', getPostOptions({'position': position}))
        .then(response => {
            return response.json();
        })
        .then((data) => {
            console.log('response:', data);
            successCallback(data.move);
        })
        .catch((error) => {
            console.log('Error in request to /analyze:', error);
            failureCallback(error);
        });
}

const getRoot = ()  => {
    console.log('called get route');
    fetch(domain + "flask/hello", getGetOptions())
        .then(response => {
            return response.json();
        })
        .then((data) => {
            console.log('response:', data);
        })
        .catch((error) => {
            console.log('Error in request to /:', error);
        });
}

export {
    nextMove,
    getRoot
}