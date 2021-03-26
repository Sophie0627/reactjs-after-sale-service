import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export const serviceService = {
    getAllServices,
};

function getAllServices(token) {
    console.log("[token]", token);
    const requestOptions = { method: 'GET', headers: { 'x-access-token' : token } };
    return fetch(`${config.apiUrl}/api/services`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}