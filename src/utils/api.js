import axios from "axios";


export const totalApi = axios.create({

  baseURL: 'https://covid-19-statistics.p.rapidapi.com/reports',
  headers: {
    'x-rapidapi-key': 'f24bb39331msh352560683a055cep11bda5jsna534be2e8a78',
    'x-rapidapi-host': 'covid-19-statistics.p.rapidapi.com'
  },
});


export const detailApi = axios.create({
    baseURL: 'https://covid-193.p.rapidapi.com',
   headers: {
    'x-rapidapi-key': 'f24bb39331msh352560683a055cep11bda5jsna534be2e8a78',
    'x-rapidapi-host': 'covid-193.p.rapidapi.com'
  },
});