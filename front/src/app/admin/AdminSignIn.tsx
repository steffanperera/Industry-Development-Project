import { Heart, Shield, DollarSign, Clock, Users, Award } from 'lucide-react';
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config/apiConfig";

interface FormData {
  username: string;
  password: string;
}

export function AdminSignIn() {
  const [form, setForm] = useState<FormData>({
    username: "",
    password: "",
  });
  
  // State to hold backend validation errors
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error message when user starts typing again
    if (error) setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state on new submit attempt

    try {
      const response = await axios.post(
        `${API_BASE_URL}/admin`,
        form
      );

      console.log(response.data);
      alert("Login successful!");
      
      // Redirect to dashboard page
      navigate("/admin/dashboard");

    } catch (err: any) {
      console.error(err);
      
      // Extract custom error message from backend response if available
      if (err.response && err.response.data && (err.response.data.message || err.response.data.error)) {
        setError(err.response.data.message || err.response.data.error);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#67C090] to-[#215B63]">
      <div className="bg-white p-10 rounded-2xl w-[350px] shadow-xl text-center">
        <h2 className="text-2xl font-bold text-[#00a63e] mb-6">
          Admin Sign In
        </h2>

        {/* Error Alert Box */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md text-left font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left">
            <label className="block text-sm mb-1">Username</label>
            <input
              type="text"
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
      </div>
    </div>
  );
}