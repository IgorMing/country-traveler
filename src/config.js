import axios from 'axios';

const BASE_URL = 'https://restcountries.eu/rest/v2';
const TIME_OUT = 2000;

export const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT
});
