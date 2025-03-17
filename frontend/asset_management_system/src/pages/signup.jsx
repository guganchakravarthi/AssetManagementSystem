import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAlert from "../coustomComponent/alert";
import axios from "axios";
import backgroundImage from "../assets/images/background.jpg";
import { Container, Card, CardContent, Typography, TextField, Button } from "@mui/material";

export default function Signup() {
  const [saveData, setSaveData] = useState({
    id: "",
    name: "",
    role: "",
    email: "",
    password: "",
  });

  const display = useAlert();
  const navigate = useNavigate();

  function handleSave(e) {
    setSaveData({ ...saveData, [e.target.name]: e.target.value });
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/register",
        saveData
      );
      console.log("Response:", response.data);

      if (response.status === 200) {
        display("Successfully registered", "success");
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          console.error("Incorrect password. Please try again.");
          display("Incorrect password. Please try again.", "error");
        } else {
          console.error("Registration failed:", error);
          display("Registration failed. Please try again.", "error");
        }
      }
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        elevation={10}
        sx={{
          padding: 3,
          width: "100%",
          maxWidth: 360,
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(15px)",
          borderRadius: "16px",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom fontWeight="bold" color="white">
            Sign Up
          </Typography>
          <form onSubmit={handleRegister}>
            <TextField
              label="Name"
              type="text"
              variant="standard"
              fullWidth
              name="name"
              value={saveData.name}
              onChange={handleSave}
              required
              sx={{ input: { color: "white" }, label: { color: "white" }, marginBottom: 1 }}
            />
            <TextField
              label="Role"
              type="text"
              variant="standard"
              fullWidth
              name="role"
              value={saveData.role}
              onChange={handleSave}
              required
              sx={{ input: { color: "white" }, label: { color: "white" }, marginBottom: 1 }}
            />
            <TextField
              label="Email"
              type="email"
              variant="standard"
              fullWidth
              name="email"
              value={saveData.email}
              onChange={handleSave}
              required
              sx={{ input: { color: "white" }, label: { color: "white" }, marginBottom: 1 }}
            />
            <TextField
              label="Password"
              type="password"
              variant="standard"
              fullWidth
              name="password"
              value={saveData.password}
              onChange={handleSave}
              required
              sx={{ input: { color: "white" }, label: { color: "white" }, marginBottom: 2 }}
            />
            <Typography variant="body2" color="white">
              Already have an account? {" "}
              <Button onClick={() => navigate("/")} sx={{ color: "#fff", textTransform: "none" }}>
                Login Here
              </Button>
            </Typography>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                marginTop: 1.5,
                padding: 0.8,
                fontSize: "0.9rem",
                fontWeight: "bold",
                borderRadius: "6px",
                background: "rgba(255, 255, 255, 0.4)",
                color: "white",
                "&:hover": { background: "rgba(255, 255, 255, 0.6)" },
              }}
            >
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
