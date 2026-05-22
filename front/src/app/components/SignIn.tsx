import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config/apiConfig";

interface FormData {
  username: string;
  password: string;
}

export function SignIn() {
  const [form, setForm] = useState<FormData>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user`,
        form
      );

      console.log(response.data.user.id);

      sessionStorage.setItem(
        "caregiverId",
        response.data.user.id
      );
      alert("Login successful!");

      navigate("/myprofile/" + response.data.user.id);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#00a63e] to-[#007a2b]">
      <div className="bg-white p-10 rounded-2xl w-[350px] shadow-xl text-center">
        <h2 className="text-2xl font-bold text-[#00a63e] mb-6">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left">
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-[#00a63e]"
              required
              name="username"
              onChange={handleChange}
            />
          </div>

          <div className="text-left">
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-[#00a63e]"
              required
              name="password"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#00a63e] text-white rounded-md font-semibold hover:bg-[#008a33] transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm">
          Don't have an account?{" "}
          <a href="#" className="text-[#00a63e] hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
