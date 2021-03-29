import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export const serviceService = {
    getAllServices,
    getOneService,
    createService
};

function getAllServices(token) {
    console.log("[token]", token);
    const requestOptions = { method: 'GET', headers: { 'x-access-token' : token } };
    return fetch(`${config.apiUrl}/api/services`, requestOptions).then(handleResponse);
}

function getOneService(id, token) {
    const requestOptions = { method: 'GET', headers: { 'x-access-token' : token } };
    return fetch(`${config.apiUrl}/api/service/${id}`, requestOptions).then(handleResponse);
}

function createService(title, description, clientId, token) {
    console.log(title, description, clientId, token);
    const requestOptions = { 
        method: 'POST', 
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({ title, description, clientId })
    };
    return fetch(`${config.apiUrl}/api/service`, requestOptions).then(handleResponse);
}