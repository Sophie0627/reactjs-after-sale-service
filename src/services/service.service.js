import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export const serviceService = {
    getAllServices,
    getOneService,
    createService,
    updateService,
    completeService,
    writeReview
};

function getAllServices(token) {
    const requestOptions = { method: 'GET', headers: { 'x-access-token' : token } };
    return fetch(`${config.apiUrl}/api/services`, requestOptions).then(handleResponse);
}

function getOneService(id, token) {
    const requestOptions = { method: 'GET', headers: { 'x-access-token' : token } };
    return fetch(`${config.apiUrl}/api/service/${id}`, requestOptions).then(handleResponse);
}

function createService(title, description, clientId, token) {
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

function updateService(serviceId, technicien, token) {
    const requestOptions = { 
        method: 'POST', 
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({ technicien })
    };
    return fetch(`${config.apiUrl}/api/service/${serviceId}`, requestOptions).then(handleResponse);
}

function completeService(serviceId, token) {
    const requestOptions = { 
        method: 'POST', 
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
        }, 
    };
    return fetch(`${config.apiUrl}/api/service_complete/${serviceId}`, requestOptions).then(handleResponse);
}

function writeReview(serviceId, review, token) {
    const requestOptions = { 
        method: 'POST', 
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({ review })
    };
    return fetch(`${config.apiUrl}/api/write_review/${serviceId}`, requestOptions).then(handleResponse);
}