const axios = require('axios');
require('dotenv').config();
const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`;

const getData = async () => {
    return data(url);
}

const getDataWithDate = async (date) => {
    const updatedUrl = `${url}&date=${date}`;
    return data(updatedUrl);
}

const getRandomData = async () => {
    const updatedUrl = `${url}&count=1`;
    return data(updatedUrl);
}

const data = async (specifiedUrl) => {
    return axios.get(specifiedUrl).then((response) => {
        return response.data;
    }).catch((error) => {
        return error;
    });
}

module.exports = {
    getData,
    getDataWithDate,
    getRandomData
}