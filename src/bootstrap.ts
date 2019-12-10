// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
import axios from 'axios';

axios.defaults.baseURL = 'http:/' +
    '/localhost:8080';
// axios.defaults.baseURL = 'https://api.bestbuypropertiesauctions.com';
axios.defaults.withCredentials = true;
