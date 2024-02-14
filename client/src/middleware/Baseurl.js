import axios from 'axios';

const instanceBaseurl = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,

})

instanceBaseurl.defaults.withCredentials = true;

instanceBaseurl.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("learning");
    config.headers.Authorization = `bearer ${JSON.parse(token)}`;
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
export default instanceBaseurl;