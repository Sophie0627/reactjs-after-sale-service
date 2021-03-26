import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export const userService = {
    getAllUser,
    getById
};

function getAllUser(token) {
    const requestOptions = { method: 'GET', headers: { 'x-access-token' : token } };
    return fetch(`${config.apiUrl}/api/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}