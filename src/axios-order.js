import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-9087e.firebaseio.com/'
});

export default instance;