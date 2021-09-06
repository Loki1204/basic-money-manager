import axios from "axios";

// Backend URL
const API = axios.create({
  baseURL: "https://basic-money-manager-api.herokuapp.com/",
});

// Intercepting the request and adding Bearer to request headers.
API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

// HTTP methods
export const getTransactions = () => API.get("/transactions");
export const addTransaction = (newTransaction) =>
  API.post("/transactions", newTransaction);
export const deleteTransaction = (id) => API.delete(`/transactions/${id}`);

export const signin = (formData) => API.post("/user/signin", formData);
export const signup = (formData) => API.post("/user/signup", formData);
