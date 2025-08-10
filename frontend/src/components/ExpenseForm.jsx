import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import dayjs from "dayjs";

export default function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState({
    date: dayjs().format("YYYY-MM-DD"),
    category: "",
    amount: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.category || !form.amount) return alert("Category and amount required");

    onAdd({
      ...form,
      amount: parseFloat(form.amount),
      date: form.date + "T00:00:00",
    });
    setForm({ date: dayjs().format("YYYY-MM-DD"), category: "", amount: "", description: "" });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <TextField
        label="Date"
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Category"
        name="category"
        value={form.category}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Amount"
        name="amount"
        type="number"
        value={form.amount}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" type="submit">
        Add Expense
      </Button>
    </Box>
  );
}
