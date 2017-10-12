const api = "http://localhost:3001";

// https://github.com/udacity/reactnd-project-readable-starter/tree/master/api-server
// Generate a unique token for storing data on the backend server
// source: MyReads React project
let token = localStorage.token;
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {'Authorization': token};
const postEntity = 'posts';
const commentEntity = 'comments';

export const get = (entityName, id) =>
    fetch(`${api}/${entityName}/${id}`, { headers })
        .then(res => res.json())
        .catch(err => console.error('Error in fetch: \n', err));

export const getAll = (entityName) =>
    fetch(`${api}/${entityName}`, { headers })
        .then(res => res.json());

export const update = (entityName, id, object) =>
    fetch(`${api}/${entityName}/${id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ object })
    }).then(res => res.json());

export const create = (entityName, object) =>
    fetch(`${api}/${entityName}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ object })
    }).then(res => res.json());

export const getComments = (postId) =>
    fetch(`${api}/${postEntity}/${postId}/${commentEntity}`, { headers })
        .then(res => res.json())
        .catch(err => console.error('Error in fetch: \n', err));

export default {getAll, get, getComments, update, create}