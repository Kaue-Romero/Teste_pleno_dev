import axios from "axios";
import toast from "react-hot-toast";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export async function getCSRFToken() {
  return axiosInstance
    .get("/sanctum/csrf-cookie", {
      withCredentials: true,
    })
    .catch((error) => {
      console.error("Error fetching CSRF token:", error);
      toast.error(
        "Failed to fetch CSRF token: " + error.response?.data?.message ||
          error.message
      );
      throw error;
    });
}

export async function login({email, password}) {
  return axiosInstance
    .post("/login", { email, password })
    .then((response) => {
      if (response.data.token) {
        toast.success("Login successful!");
        window.location.href = "/";
      } else {
        toast.error("Login failed. Please try again.");
      }
      return response.data;
    })
    .catch((error) => {
      console.error("Error during login:", error);
      toast.error(
        "Login failed: " + error.response?.data?.message || error.message
      );
      throw error;
    });
}

export async function register({email, name, password, password_confirmation}) {
  return axiosInstance
    .post("/register", { email, name, password, password_confirmation })
    .then(() => {
      toast.success("Registration successful!");
      window.location.href = "/login";
    })
    .catch((error) => {
      console.error("Error during registration:", error);
      toast.error(
        error.response?.data?.message || error.message
      );
      throw error;
    });
}

export async function getAllItems() {
  return (await axiosInstance.get("/api/tasks")).data;
}

export async function addItem(item) {
  return axiosInstance
    .post("/api/tasks", item)
    .then((response) => {
      response.data
        ? toast.success("Item added successfully!")
        : toast.error("Failed to add item.");
      return response.data;
    })
    .catch((error) => {
      console.log("Error adding item:", error);
      toast.error(
        "Failed to add item: " + error.response?.data?.message || error.message
      );
      throw error;
    });
}

export async function deleteItem(id) {
  return axiosInstance
    .delete(`/api/tasks/${id}`)
    .then((response) => {
      response.data
        ? toast.success("Item deleted successfully!")
        : toast.error("Failed to delete item.");
      return response.data;
    })
    .catch((error) => {
      console.log("Error deleting item:", error);
      toast.error(
        "Failed to delete item: " + error.response?.data?.message ||
          error.message
      );
      throw error;
    });
}

export async function updateItem(id, item) {
  return axiosInstance
    .put(`/api/tasks/${id}`, item)
    .then((response) => {
      response.data
        ? toast.success("Item updated successfully!")
        : toast.error("Failed to update item.");
      return response.data;
    })
    .catch((error) => {
      console.log("Error updating item:", error);
      toast.error(
        "Failed to update item: " + error.response?.data?.message ||
          error.message
      );
      throw error;
    });
}

export async function changeStatus(id, status) {
  return axiosInstance
    .put(`/api/tasks/${id}`, { status })
    .then((response) => {
      response.data
        ? toast.success("Item status changed successfully!")
        : toast.error("Failed to change item status.");
      return response.data;
    })
    .catch((error) => {
      console.log("Error changing item status:", error);
      toast.error(
        "Failed to change item status: " + error.response?.data?.message ||
          error.message
      );
      throw error;
    });
}
