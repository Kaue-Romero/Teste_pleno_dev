import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

export async function getAllItems() {
  return (await axiosInstance.get("/api/tasks")).data;
}

export function addItem(item) {
  return axiosInstance.post("/api/tasks", {});
}