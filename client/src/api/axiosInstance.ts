import axios, { AxiosInstance } from "axios";

export const baseUrl: string =
  process.env.NODE_ENV === "production" ? "https://my.herokuapp.com/api" : "http://localhost:3001/api";

const api: AxiosInstance = axios.create({
  baseURL: baseUrl,
});

export default api;
