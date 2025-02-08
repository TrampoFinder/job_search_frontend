import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 4000,
});

// api.interceptors.request.use((config) => {
//   const token = user_token;

//   if (token) {
//     config.headers.Authorization = `Bearer ${user_token}`;
//   }

//   return config;
// });
