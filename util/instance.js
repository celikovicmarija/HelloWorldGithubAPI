const axios = require('axios');
const instance = axios.create({
    baseURL: 'https://api.github.com/',
    timeout: 6000,
    headers: {
        "accept": "application/vnd.github.v3+json",
        "authorization": "Bearer " + "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",
        "Content-Type": "application/json"
    }
});

module.exports = instance;