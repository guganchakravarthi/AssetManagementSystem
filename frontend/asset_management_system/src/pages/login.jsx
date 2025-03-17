import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAlert from "../coustomComponent/alert";
import { TextField, Button, Container, Typography, Card, CardContent } from "@mui/material";
import backgroundImage from "../assets/images/background.jpg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let alrt = useAlert();

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      alrt("Please enter both email and password", "warning");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        { email, password },
        { withCredentials: true }
      );
      console.log(response.data);

      if (response.status === 200) {
        alrt("Successfully logged in", "success");
        localStorage.setItem("token", response.data.token);
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
        setTimeout(() => navigate("/home"), 1000);
      } else {
        alrt("Invalid email or password", "error");
      }
    } catch (error) {
      console.error("Login error:", error);
      alrt(error.response?.data?.message || "Login failed", "error");
    } finally {
      setLoading(false);
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
          padding: 4,
          width: "100%",
          maxWidth: 380,
          textAlign: "center",
          backgroundColor: "rgba(61, 61, 61, 0)",
          backdropFilter: "blur(8px)",
          borderRadius: "20px",
          boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.4)",
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="white">
            Welcome Back
          </Typography>
          <Typography variant="body2" gutterBottom color="white">
            Please enter your login details
          </Typography>
          <form onSubmit={handleLogin} style={{ width: "100%" }}>
            <TextField
              label="Email"
              type="email"
              variant="standard"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{
                borderRadius: "8px",
                input: { color: "white", backgroundColor: "transparent" },
                label: { color: "white" },
              }}
            />
            <TextField
              label="Password"
              type="password"
              variant="standard"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{
                borderRadius: "8px",
                input: { color: "white", backgroundColor: "transparent" },
                label: { color: "white" },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                marginTop: 2,
                padding: 1,
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: "8px",
                background: loading ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.4)",
                color: "white",
                "&:hover": { background: "rgba(255, 255, 255, 0.62)" },
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginPage;
