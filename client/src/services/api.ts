const axios = require('axios').default;
import appConfigs from '../../app.configs.json';

export const api = axios.create({
    baseURL: appConfigs.api.baseURL
});
