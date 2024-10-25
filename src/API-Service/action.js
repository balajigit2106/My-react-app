import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const AccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJiYWxhamlAZ21haWwuY29tIiwiaWF0IjoxNzI5ODQ4NDA4LCJleHAiOjE3Mjk5MzQ4MDh9.lzVqJ490aCxImCuJtY4aAlnl5796kwAWTmpZCbfs4pw";

    config.headers.Authorization = `Bearer ${AccessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
