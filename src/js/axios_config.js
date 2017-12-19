import axios from 'axios';

import { domain } from './api_config.js';


//配置默认域名

axios.defaults.baseURL = domain;

//到处配置后的axios

export default axios;