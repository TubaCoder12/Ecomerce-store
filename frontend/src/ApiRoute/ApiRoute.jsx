import axios from "axios";
import { store } from "../app/store";
import { login, Logout } from "../app/Redux/AuthSlice";
export const img_port = " http://localhost:4000";
const BASE_URL = "http://localhost:4000/api/v1";

export const API = {
  ACCESS: "/user/access",
  LOGIN: "/user/login",
  SIGNUP: "/user/signup",
  PRESIGN: "/user/pre-signup",
  RESET: "/user/reset-password",
  FORGET: "/user/forget-password",
  LOGOUT: "/user/logout",
  REFRESH: "/user/refresh",
};

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const { auth } = store.getState();
  if (auth.accessToken) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`;
  }
  return config;
});

// Response interceptor → Token expire ho to refresh
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await api.post(API.REFRESH);
        store.dispatch(
          login({
            user: store.getState().auth.user,
            token: res.data.token,
            role: res.data.role,
          })
        );
        originalRequest.headers.Authorization = `Bearer ${res.data.token}`;
        return api(originalRequest); // retry original request
      } catch (err) {
        store.dispatch(Logout());
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
