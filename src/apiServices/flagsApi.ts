import axios from 'axios'

export const flagsApi = axios.create({
  baseURL: 'https://flagcdn.com/'
})

export const getCodes = (language: 'pl' | 'en') =>
  flagsApi.get(`${language}/codes.json`)
