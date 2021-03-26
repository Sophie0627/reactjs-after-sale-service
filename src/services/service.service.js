import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export const serviceService = {
    getAllServices,
    getOneService
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