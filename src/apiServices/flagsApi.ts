import axios from "axios";

export const flagsApi = axios.create({
  baseURL: "https://flagcdn.com/",
});

// const item = window.localStorage.getItem("regionalSettings");
// const languageCode = item && JSON.parse(item).language.languageCode;

export const getCodes = (language: "pl" | "en") =>
  flagsApi.get(`${language}/codes.json`);
