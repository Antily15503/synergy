//fetches data from cryptoApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//get headers for Api
const cryptoApiHeaders = {
    'X-RapidAPI-Key': '13ce5f06d0msh022202b12502685p106427jsn8ddb7a0a339a',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}