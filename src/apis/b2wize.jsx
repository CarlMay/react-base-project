import axios from 'axios';

export default axios.create({
    baseURL: 'https://n61jo6k2hb.execute-api.us-east-1.amazonaws.com/dev/parts/',
});