import axios from "axios";
import Environment from "../../environment/Environment";

class NetworkService {

    constructor() {
        axios.defaults.baseURL = Environment.getApiUrl();
    }

    addRequestInterceptor = (onFulfilled, onRejected) => {
        return axios.interceptors.request.use(onFulfilled, onRejected);
    };

    addResponseInterceptor = (onFulfilled, onRejected) => {
        return axios.interceptors.response.use(onFulfilled, onRejected);
    };

    post = (url, data) => {
        return axios.post(url, data);
    };

    put = (url, data) => {
        return axios.put(url, data);
    };

    get = (url, data) => {
        return axios.get(url, data);
    };

    reRunRequest = (request) => {
        return axios(request);
    };

}

const NetworkServiceInstance = new NetworkService();

export default NetworkServiceInstance;
