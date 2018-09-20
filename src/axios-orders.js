import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-6e1da.firebaseio.com/'
});

export default instance;