import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return req;
});

export const getUsers = () => API.get('/users');
export const createUser = (newUser) => API.post('/users/register', newUser);
export const updateUser = (id, updatedUser) => API.put(`/users/${id}`, updatedUser);
export const deleteUser = (id) => API.delete(`/users/${id}`);
