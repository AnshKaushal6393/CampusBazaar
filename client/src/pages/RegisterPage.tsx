import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/useAuth";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    collegeId: "",
    email: "",
    password: "",
    college: "",
    avatarUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register({
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      college: formData.college,
      collegeId: formData.collegeId,
      avatar: formData.avatarUrl || null,
    });
    if (!success) {
      toast.error("Email already registered.");
      return;
    }
    toast.success("Account created!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <div className="brand-gradient rounded-3xl p-8 text-white relative overflow-hidden hidden lg:flex flex-col justify-between">
          <div className="absolute -left-10 -bottom-8 w-36 h-36 rounded-full bg-white/10" />
          <div>
            <span className="accent-pill">Start Trading</span>
            <h2 className="text-4xl font-extrabold mt-6 leading-tight">Join your campus circle in under 2 minutes.</h2>
            <p className="text-white/85 mt-4">List textbooks, grab essentials, and reduce waste through local student exchanges.</p>
          </div>
          <div className="note-card p-4 text-[var(--color-ink)]">
            <p className="text-sm font-semibold">Student-friendly tip: clear profile details increase trust and faster responses.</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="notebook-panel p-7 sm:p-9"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-[var(--color-brand)] font-semibold mb-4">
            <ShoppingBag className="h-6 w-6" />
            CampusBazaar
          </Link>
          <p className="paper-tag">Create Account</p>
          <h1 className="text-3xl font-extrabold text-[var(--color-ink)] mt-3">Join CampusBazaar</h1>
          <p className="text-[var(--color-muted)] text-sm mt-2">Your marketplace profile for smarter campus buying and selling.</p>

          <div className="space-y-4 mt-6">
            <input
              name="fullName"
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="campus-input"
            />
            <input
              name="collegeId"
              type="text"
              placeholder="College ID Number"
              value={formData.collegeId}
              onChange={handleChange}
              required
              className="campus-input"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="campus-input"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="campus-input"
            />
            <input
              name="college"
              type="text"
              placeholder="College Name"
              value={formData.college}
              onChange={handleChange}
              required
              className="campus-input"
            />
            <input
              name="avatarUrl"
              type="text"
              placeholder="Avatar URL (optional)"
              value={formData.avatarUrl}
              onChange={handleChange}
              className="campus-input"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 rounded-xl py-2.5 font-bold text-white bg-[var(--color-brand)] hover:bg-[var(--color-brand-strong)] transition"
          >
            Register
          </button>

          <p className="mt-4 text-center text-sm text-[var(--color-muted)]">
            Already have an account?{" "}
            <Link to="/login" className="text-[var(--color-brand)] hover:text-[var(--color-brand-strong)] font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
