import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export const userService = {
    getAllUsers,
    getById,
    createTechnicien
};

function getAllUsers(token) {
    const requestOptions = { method: 'GET', headers: { 'x-access-token' : token } };
    return fetch(`${config.apiUrl}/api/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/api/users/${id}`, requestOptions).then(handleResponse);
}

function createTechnicien(username, email, password, token) {
    const requestOptions = { 
        method: 'POST', 
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({ username, email, password })
    };
    return fetch(`${config.apiUrl}/api/user/technicien`, requestOptions).then(handleResponse);
}