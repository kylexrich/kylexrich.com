import axios, { AxiosInstance } from 'axios';

const env = process.env.REACT_APP_ENV === 'staging' ? 'staging' : process.env.NODE_ENV;
let host: string;

switch (env) {
    case 'development':
        host = `http://localhost:${3001}/api`;
        break;
    case 'staging':
        host = 'https://kylexrich-staging-d5a9dbd6a715.herokuapp.com/api';
        break;
    case 'production':
        host = 'https://kylexrich-402391673bb6.herokuapp.com/api';
        break;
    default:
        host = `http://localhost:${3001}/api`;
        break;
}

const api: AxiosInstance = axios.create({
    baseURL: host,
    withCredentials: true
});

export type RequestMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export default api;
