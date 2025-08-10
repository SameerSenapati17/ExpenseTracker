import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
} from "@mui/material";
import { formatDate } from "../utils/dateUtils";

export default function ExpenseList({ expenses }) {
  if (!expenses.length)
    return <Typography>No expenses yet. Add some!</Typography>;

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((exp) => (
            <TableRow key={exp.id}>
              <TableCell>{formatDate(exp.date)}</TableCell>
              <TableCell>{exp.category}</TableCell>
              <TableCell>${exp.amount.toFixed(2)}</TableCell>
              <TableCell>{exp.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
