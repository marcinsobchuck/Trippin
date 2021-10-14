import axios from "axios";

export const flagsApi = axios.create({
  baseURL: "https://flagcdn.com/",
});

export const getCodes = () => flagsApi.get("en/codes.json");
