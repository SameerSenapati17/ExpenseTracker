import React, { useEffect, useState } from "react";
import { Container, Typography, Snackbar, Alert, Box } from "@mui/material";
import Navbar from "../components/Navbar";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import { fetchExpenses, addExpense } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A", "#3366AA"];

export default function Dashboard() {
  const { token } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    if (token) loadExpenses();
  }, [token]);

  const loadExpenses = async () => {
    try {
      const data = await fetchExpenses(token);
      setExpenses(data);
    } catch {
      setSnack({ open: true, message: "Failed to load expenses", severity: "error" });
    }
  };

  const handleAddExpense = async (expense) => {
    try {
      await addExpense(token, expense);
      setSnack({ open: true, message: "Expense added", severity: "success" });
      loadExpenses();
    } catch {
      setSnack({ open: true, message: "Failed to add expense", severity: "error" });
    }
  };

  const summaryData = expenses.reduce((acc, exp) => {
    const index = acc.findIndex((item) => item.name === exp.category);
    if (index === -1) acc.push({ name: exp.category, value: exp.amount });
    else acc[index].value += exp.amount;
    return acc;
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <Typography variant="h5" gutterBottom>
          Add New Expense
        </Typography>
        <ExpenseForm onAdd={handleAddExpense} />

        <Typography variant="h5" gutterBottom>
          Expenses
        </Typography>
        <ExpenseList expenses={expenses} />

        <Box sx={{ height: 300, mt: 5 }}>
          <Typography variant="h6" gutterBottom>
            Spending by Category
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                dataKey="value"
                data={summaryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {summaryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        <Snackbar
          open={snack.open}
          autoHideDuration={3000}
          onClose={() => setSnack({ ...snack, open: false })}
        >
          <Alert severity={snack.severity}>{snack.message}</Alert>
        </Snackbar>
      </Container>
    </>
  );
}
