import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development" ? "http://localhost:5500" : BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
