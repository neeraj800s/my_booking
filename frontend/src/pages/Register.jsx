import { useState } from "react";
import api from "../services/api";
import { saveToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }
    try {
      const res = await api.post("/auth/register", form);
      saveToken(res.data.token, form.name); // save name locally
      setForm({ name: "", email: "", password: "" });
      navigate("/"); // redirect to home
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md" onSubmit={submit}>
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Register</h2>
        <input
          className="w-full p-3 mb-4 border rounded focus:ring-2 focus:ring-purple-500"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="w-full p-3 mb-4 border rounded focus:ring-2 focus:ring-purple-500"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="w-full p-3 mb-6 border rounded focus:ring-2 focus:ring-purple-500"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}
