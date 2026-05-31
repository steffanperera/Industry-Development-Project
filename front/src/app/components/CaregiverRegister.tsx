import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config/apiConfig";


interface FormData {
  userole:string;
  firstName: string;
  lastName: string;
  dob: string;
  

  mobile: string;
  email: string;
  address: string;
  city: string;

  password: string;
  confirmPassword: string;
}

export function CaregiverRegister() {
  const [form, setForm] = useState<FormData>({
    userole:"",
    firstName: "",
    lastName:"",
    dob: "",

    mobile: "",
    email: "",
    address: "",
    city: "",

    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
  userole:"",
    firstName: "",
    lastName:"",
    dob: "",

    mobile: "",
    email: "",
    address: "",
    city: "",

    password: "",
    confirmPassword: "",
});

  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleNumber = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  // check if user typed non-numeric
  const hasNonNumeric = /\D/.test(value);

  if (hasNonNumeric) {
    setErrors((prev) => ({
      ...prev,
      [name]: "Only numbers are allowed"
    }));
  } else {
    setErrors((prev) => ({
      ...prev,
      [name]: ""
    }));
  }

  setForm((prev) => ({
    ...prev,
    [name]: value.replace(/\D/g, "")
  }));
};
    
const validatePassword = () => {
  let newErrors: any = {};

  const password = form.password;
  const confirmPassword = form.confirmPassword;

  // Strong password regex
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  //if (!passwordRegex.test(password)) {
   // newErrors.password =
    //  "Password must be 8+ chars, include uppercase, lowercase, number, and special character";
  //}

  if (password.length < 6) {
  newErrors.password = "Password must be at least 6 characters";
}

  if (password !== confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

  // inside component
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  if (!validatePassword()) return;

  try {
    let url = "";
    console.log(form.userole);
    if (form.userole === "caregiver") {
      url = `${API_BASE_URL}/caregivers/register`;
    } else if (form.userole === "employer") {
      url = `${API_BASE_URL}/employers/register`;
    }

    const response = await axios.post(url, form);

    console.log(response.data);
    alert("Registration successful!");

    // Redirect based on role
    if (form.userole === "caregiver") {
      navigate("/onboarding/"+ response.data.caregiverId);
    } else {
      navigate("/employer/dashboard/" + response.data.employerId);
    }

  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center pt-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-[#00a63e] text-center">
          Registration
        </h2>

        {/* Personal Info */}
        <div>
          <input name="userole" type="radio"  value="caregiver" onChange={handleChange} required/> I'm a Care Giver <br />
          <input name="userole" type="radio"  value="employer" onChange={handleChange}/> I'm a Employer <br /><br />
          <h3 className="font-semibold mb-2">Personal Information</h3>
          <label className="label">First Name</label>
          <input name="firstName" placeholder="First Name" onChange={handleChange} className="input" required />
          <label className="label">Last Name</label>
          <input name="lastName" placeholder="Last Name" onChange={handleChange} className="input" required/>
          <label className="label">Birth Date</label>
          <input type="date" name="dob" onChange={handleChange} className="input" />
         
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-2">Contact Details</h3>
          <label className="label">Phone number</label>
          <input name="mobile" placeholder="Mobile" onChange={handleNumber} className="input" required/>
          {errors.mobile && (
  <p className="text-red-500 text-sm">{errors.mobile}</p>
)}
          <label className="label">Email</label>
          <input name="email" placeholder="Email" onChange={handleChange} className="input" type="email" required/>
          <label className="label">Address</label>
          <input name="address" placeholder="Address" onChange={handleChange} className="input" required/>
          <label className="label">Postcode</label>
          <input name="city" placeholder="Postcode" onChange={handleNumber} className="input" required/>
          {errors.city && (
  <p className="text-red-500 text-sm">{errors.city}</p>
)}
        </div>

        

<div>
            <label  className="mr-3 px-3">
                <input type="checkbox" value='Policy' name="Policy" required/> Accept terms of service and privacy policy.
              </label>
              </div>
              <div>
              <label className="mr-3 px-3">
                <input type="checkbox" value='Consent' name="Consent" required/> Consent to have data anonymised and used for research purposes.
              </label>
              </div>

        {/* Account */}
        <div>
          <h3 className="font-semibold mb-2">Account Setup</h3>
          <input type="password" name="password" placeholder="Password" onChange={handleChange} className={`input ${errors.password ? "border-red-500" : ""}`} required/>
          {errors.password && (
  <p className="text-red-500 text-sm">{errors.password}</p>
)}
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className={`input ${errors.confirmPassword ? "border-red-500" : ""}`} required/>
        {errors.confirmPassword && (
  <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
)}
        </div>

        <button className="w-full bg-[#00a63e] text-white py-3 rounded-lg hover:bg-[#008a33]">
          Register & go to Login
        </button>
      </form>

      {/* Tailwind reusable input style */}
      <style>{`
        .input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};
