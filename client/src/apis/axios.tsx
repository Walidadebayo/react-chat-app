import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const api = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? "http://localhost:5500" : process.env.BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;