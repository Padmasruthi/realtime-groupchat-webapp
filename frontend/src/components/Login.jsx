import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../utils/api";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import bgimg from "../assets/bgimg.jpg";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return toast.error("All fields required", { toastId: "loginError", autoClose: 2000 });
    }

    try {
      const res = await API.post("/auth/login", form);
      login(res.data);
      toast.success("Login Successful 🚀", { toastId: "loginSuccess", autoClose: 2000 });
      navigate("/chat");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed",
        { toastId: "loginFail", autoClose: 2000 }
      );
    }
  };

  return (
    <div className="auth-bg" style={{ backgroundImage: `url(${bgimg})` }}>
      <div className="auth-card">
        <h3 className="text-center mb-4" style={{ color: "var(--primary)" }}>
          Welcome Back
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3 input-group">
            <span className="input-group-text">
              <FaEnvelope />
            </span>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3 input-group">
            <span className="input-group-text">
              <FaLock />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="form-control"
              placeholder="Password"
              onChange={handleChange}
            />
            <span
              className="input-group-text"
              style={{ cursor: "pointer", background: "var(--primary)", color: "#fff" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit">Login</button>
        </form>

        <p className="mt-3 text-center">
          No account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;