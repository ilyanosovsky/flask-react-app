import "./App.css";

// Material UI imports
import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";
import Paper from "@mui/material/Paper";
import LockIcon from "@mui/icons-material/Lock";

import Switch from "@mui/material/Switch";
import React, { useState } from "react";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import axios from 'axios';

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(true);

  const handleSignUp = async () => {
    try {
        await axios.post("/signup", { email, password });
        // Handle success and UI update if needed
    } catch (error) {
        console.error("Error signing up:", error);
        // Handle error and UI update if needed
    }
  }

  const handleSignIn = async () => {
    try {
        const response = await axios.post("/signin", { email, password });
        const token = response.data.access_token;
        localStorage.setItem('token', token);
        // Handle success and UI update if needed
    } catch (error) {
        console.error("Error signing in:", error);
        // Handle error and UI update if needed
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

export default App;