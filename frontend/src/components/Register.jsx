import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/api";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import bgimg from "../assets/bgimg.jpg";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      return toast.error("All fields required", { toastId: "regError", autoClose: 2000 });
    }

    if (form.password.length < 6) {
      return toast.error("Password must be at least 6 characters", { toastId: "regPass", autoClose: 2000 });
    }

    try {
      await API.post("/auth/register", form);
      toast.success("Account created successfully 🎉", { toastId: "regSuccess", autoClose: 2000 });
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed",
        { toastId: "regFail", autoClose: 2000 }
      );
    }
  };

  return (
    <div className="auth-bg" style={{ backgroundImage: `url(${bgimg})` }}>
      <div className="auth-card">
        <h3 className="text-center mb-4" style={{ color: "var(--primary)" }}>
          Create Account
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3 input-group">
            <span className="input-group-text">
              <FaUser />
            </span>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Full Name"
              onChange={handleChange}
            />
          </div>

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

          <button type="submit">Register</button>
        </form>

        <p className="mt-3 text-center">
          Already have account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;