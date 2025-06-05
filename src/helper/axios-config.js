import axios from "axios";

const API_URL = { local: "http://localhost:8080/api" };

const axiosInstance = axios.create({
       baseURL: API_URL.local,
       timeout: 10000, // 10 seconds timeout
       headers: {
              "Content-Type": "application/json",
       },
});

export { axiosInstance };