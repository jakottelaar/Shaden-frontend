// import axios from "axios";
// import { refresh } from "./auth-service";
// import { useSession } from "next-auth/react";

// const API_BASE_URL = process.env.API_BASE_URL;
// let isRetrying = false;

// const api = axios.create({
//   baseURL: API_BASE_URL,
// });

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalConfig = error.config;
//     const status = error.response?.status;
//     console.log("Status:", status);

//     if (status === 401 && !isRetrying) {
//       isRetrying = true;

//       const refreshToken = localStorage.getItem("refreshToken");

//       if (refreshToken) {
//         try {
//           const response = await refresh(refreshToken);
//           console.log(response.data);

//           localStorage.setItem("accessToken", response.data.access_token);
//           localStorage.setItem("refreshToken", response.data.refresh_token);

//           return api.request(originalConfig);
//         } catch (refreshError) {
//           console.error("Token refresh failed:", refreshError);
//         }
//       } else {
//       }
//     }
//     return Promise.reject(error);
//   },
// );

// export default api;
