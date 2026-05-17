import { useState } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import albalogo from "../../assets/Alba-English-Logo.png";

function Navbar() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost/library-api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("role", data.role);
        localStorage.setItem("full_name", data.full_name);

        navigate("/home");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-brand">
          <img
            src={albalogo}
            alt="Alba Logo"
            className="Alba-Logo"
          />
          <h1>Alba Library System</h1>
          <p>Internal Book Management Portal</p>
        </div>

        <div className="login-divider" />

        <form onSubmit={handleLogin} className="login-form">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

      </div>
    </div>
  );
}

export default Navbar;
