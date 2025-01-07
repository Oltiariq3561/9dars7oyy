import React, { useState } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { TextField, Button, Container, Typography, Grid, Paper } from '@mui/material';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, PointElement, LineElement);

const Chart = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ category: '', amount: '', month: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newExpense.category && newExpense.amount && newExpense.month) {
      setExpenses([...expenses, newExpense]);
      setNewExpense({ category: '', amount: '', month: '' });
    }
  };

  const categories = ['Ovqat', 'Transport', 'O‘yin-kulgi'];
  const categoryData = categories.map((category) => {
    return expenses
      .filter(exp => exp.category === category)
      .reduce((acc, exp) => acc + parseFloat(exp.amount), 0);
  });

  const months = [...new Set(expenses.map(exp => exp.month))];
  const monthlyData = categories.map((category) => {
    return months.map((month) => {
      return expenses
        .filter(exp => exp.category === category && exp.month === month)
        .reduce((acc, exp) => acc + parseFloat(exp.amount), 0);
    });
  });

  const pieData = {
    labels: categories,
    datasets: [
      {
        data: categoryData,
        backgroundColor: ['#ff9999', '#66b3ff', '#99ff99'],
      },
    ],
  };

  const lineData = categories.map((category, index) => ({
    label: category,
    data: monthlyData[index],
    borderColor: ['#ff9999', '#66b3ff', '#99ff99'][index],
    fill: false,
  }));

  const lineChartData = {
    labels: months,
    datasets: lineData,
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dinamik Xarajatlar Statistikasi
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Kategoriya"
              value={newExpense.category}
              onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Xarajat miqdori"
              type="number"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Oylik"
              value={newExpense.month}
              onChange={(e) => setNewExpense({ ...newExpense, month: e.target.value })}
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
          Xarajatni qo‘shish
        </Button>
      </form>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Xarajatlar Kategoriyalari
            </Typography>
            <Pie data={pieData} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Oylik Trend
            </Typography>
            <Line data={lineChartData} />
          </Paper>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Xarajatlar ro‘yxati
      </Typography>
      <Paper elevation={2} sx={{ padding: 2 }}>
        <ul>
          {expenses.map((expense, index) => (
            <li key={index}>
              {expense.category} - {expense.amount} ({expense.month})
            </li>
          ))}
        </ul>
      </Paper>
    </Container>
  );
};

export default Chart;
