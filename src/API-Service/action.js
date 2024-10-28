import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const AccessToken = localStorage.getItem("Accesstoken");

    config.headers.Authorization = `Bearer ${AccessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (payload) => {
  try {
    const response = await api.post("/api/login", payload);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUsers = async (payload) => {
  try {
    const response = await api.get("/api/getUsers", {
      params: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getTeams = async (payload) => {
  try {
    const response = await api.get("/api/getTeams", {
      params: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// user
export const createUser = async (payload) => {
  try {
    const response = await api.post("/api/createUser", payload);
    return response;
  } catch (error) {
    throw error;
  }
};
