import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

const TodoApp = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({ name: false, category: false });

  const handleAddClick = () => {
    const newErrors = {
      name: !name.trim(),
      category: !category,
    };

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.category) {
      const newTask = { name, category };
      setData([...data, newTask]);
      setName("");
      setCategory("");
      setErrors({ name: false, category: false });
    }
  };

  const handleDeleteClick = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: "50px auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
       1-vazifa ToDo Ro'yxati
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Yangi vazifa kiriting..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          helperText={errors.name ? "Vazifa nomini kiriting" : ""}
        />
        <FormControl fullWidth error={errors.category}>
          <InputLabel id="category-label">Kategoriya</InputLabel>
          <Select
            labelId="category-label"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="Ish">Ish</MenuItem>
            <MenuItem value="Uy">Uy</MenuItem>
            <MenuItem value="O‘qish">O‘qish</MenuItem>
          </Select>
          {errors.category && <FormHelperText>Kategoriya tanlang</FormHelperText>}
        </FormControl>
        <Button variant="contained" size="large" onClick={handleAddClick}>
          Qo'shish
        </Button>
      </Box>
      <List>
        {data.map((task, i) => (
          <Paper elevation={2} sx={{ marginBottom: "10px" }} key={i}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" onClick={() => handleDeleteClick(i)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={task.name}
                secondary={`Kategoriya: ${task.category}`}
              />
            </ListItem>
          </Paper>
        ))}
      </List>
    </Box>
  );
};

export default TodoApp;
