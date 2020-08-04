import axios from 'axios';

const API = axios.create({
    baseURL: 'http://192.168.1.11:3333'
})

export default API