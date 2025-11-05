import axios from "axios";
import { store } from "../app/store";
import { login, Logout } from "../app/Redux/AuthSlice";


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
  
  // ✅ Pehle Redux se, fir localStorage se token lo
  const token = auth?.token ;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - FIXED VERSION
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    console.log("❌ API Error:", error.response?.status, error.config?.url);

    // ✅ IMPORTANT: Agar refresh API khud fail ho rahi hai to loop se bacho
    if (error.config?.url.includes("/user/refresh")) {
      console.log("🔄 Refresh API failed - logging out");
      localStorage.removeItem('authToken');
      store.dispatch(Logout());
      
      const loginError = new Error("Session expired. Please login again.");
      loginError.isAuthError = true;
      return Promise.reject(loginError);
    }

    // Skip for login/signup routes
    if (
      originalRequest.url.includes("/login") ||
      originalRequest.url.includes("/signup")
    ) {
      return Promise.reject(error);
    }

    // Handle 401 - Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log("🔄 Attempting token refresh...");
        
        // Try to refresh token
        const response = await api.post("/user/refresh");
        const newToken = response.data.token;

        console.log("✅ Token refresh successful");

        // ✅ Token ko dono jagah save karo
        localStorage.setItem('authToken', newToken);
        
        // Update store with new token
        store.dispatch(
          login({
            user: store.getState().auth.user,
            token: newToken,
            role: response.data.role,
          })
        );

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);

      } catch (refreshError) {
        console.log("❌ Token refresh failed");
        
        // Refresh failed - logout user and clear token
        localStorage.removeItem('authToken');
        store.dispatch(Logout());
        
        const loginError = new Error("Session expired. Please login again.");
        loginError.isAuthError = true;
        return Promise.reject(loginError);
      }
    }

    // For other errors
    return Promise.reject(error);
  }
);