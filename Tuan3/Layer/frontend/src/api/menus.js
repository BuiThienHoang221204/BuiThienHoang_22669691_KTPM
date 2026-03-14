import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return req;
});

export const getMenus = () => API.get('/menus');
export const createMenu = (newMenu) => API.post('/menus', newMenu);
export const updateMenu = (id, updatedMenu) => API.put(`/menus/${id}`, updatedMenu);
export const deleteMenu = (id) => API.delete(`/menus/${id}`);
