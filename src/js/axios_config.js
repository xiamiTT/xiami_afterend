import axios from 'axios';

import { domain } from './api_config.js';


//配置默认域名

axios.defaults.baseURL = domain;

// 因为我们调用的接口都是跨域的, 默认不会携带cookie, 如果需要携带, 就必须配置withCredentials为true
axios.defaults.withCredentials = true;


//到处配置后的axios

export default axios;