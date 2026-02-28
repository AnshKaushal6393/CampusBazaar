import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

interface LocalRegisterUser {
  name: string;
  email: string;
  password: string;
  college: string;
  collegeId: string;
  avatar: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    college: "",
    collegeId: "",
    avatar: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("campusbazaar-users") || "[]") as LocalRegisterUser[];

    const userExists = users.some((user) => user.email === formData.email);
    if (userExists) {
      toast.error("A user with this email already exists.");
      return;
    }

    const updatedUsers = [...users, formData];
    localStorage.setItem("campusbazaar-users", JSON.stringify(updatedUsers));

    toast.success("Registered Successfully!");
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-emerald-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-bold text-emerald-600 text-center">Register</h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />

        <input
          type="text"
          name="college"
          placeholder="College Name"
          value={formData.college}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />

        <input
          type="text"
          name="collegeId"
          placeholder="College ID Number"
          value={formData.collegeId}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />

        <input
          type="text"
          name="avatar"
          placeholder="Avatar URL (optional)"
          value={formData.avatar}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />

        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
