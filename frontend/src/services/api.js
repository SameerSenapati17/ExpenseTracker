import axios from "axios";

const API_URL = "http://localhost:8000";

export const loginUser = async (email, password) => {
  const params = new URLSearchParams();
  params.append("username", email);
  params.append("password", password);
  const res = await axios.post(`${API_URL}/token`, params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return res.data;
};

export const fetchExpenses = async (token) => {
  const res = await axios.get(`${API_URL}/expenses/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const addExpense = async (token, expense) => {
  const res = await axios.post(`${API_URL}/expenses/`, expense, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
