import axios from 'axios';

const instance = axios.create({
    baseURL: "https://myburger-react-64ebe.firebaseio.com/"
});

export default instance;

