// Material UI imports
import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";
import Paper from "@mui/material/Paper";
import LockIcon from "@mui/icons-material/Lock";
import Switch from "@mui/material/Switch";
import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(true);
    const navigate = useNavigate();
  
    const handleSignUp = async (emailInput, passwordInput) => {
      try {
          await axios.post("/signup", { email, password });
      } catch (error) {
          console.error("Error signing up:", error);
      }
    }
  
    const handleSignIn = async (emailInput, passwordInput) => {
      try {
          const response = await axios.post("/signin", { email, password });
          const token = response.data.access_token;
          localStorage.setItem('token ->', token);
          navigate("/home");
      } catch (error) {
          console.error("Error signing in:", error);
      }
    }
  
    const handleChange = (event) => {
      setChecked(event.target.checked);
    };
  
    return (
      <div className="App">
        <Paper elevation={3} style={{ padding: "10px", paddingBottom: "50px" }}>
          <div align="center">
            {checked ? (
              <Chip
                icon={<LockIcon />}
                label="Sign Up"
                variant="outlined"
                color="info"
              />
            ) : (
              <Chip
                icon={<FaceIcon />}
                label="Log In"
                variant="outlined"
                color="info"
              />
            )}
            <br />
  
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
  
          {/* Switch between SignUpForm and SignInForm based on checked state */}
          {checked ? (
              <SignUpForm
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  handleSubmit={handleSignUp}
              />
          ) : (
              <SignInForm
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  handleSubmit={handleSignIn}
              />
          )}
        </Paper>
      </div>
    );
}

export default LoginPage;