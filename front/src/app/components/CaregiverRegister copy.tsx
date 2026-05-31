import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config/apiConfig";


interface FormData {
  fullName: string;
  dob: string;
  gender: string;
  nic: string;
  photo: File | null;

  mobile: string;
  email: string;
  address: string;
  city: string;

  experience: string;
  years: string;
  careTypes: string[];
  organization: string;

  certifications: string;
  certificationList: string;
  skills: string[];
  languages: string;

  availability: string;
  hours: string;
  weekends: string;
  location: string;

  medical: string;
  criminal: string;
  emergency: string;

  username: string;
  password: string;
  confirmPassword: string;
}

export function CaregiverRegister() {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    dob: "",
    gender: "",
    nic: "",
    photo: null,

    mobile: "",
    email: "",
    address: "",
    city: "",

    experience: "",
    years: "",
    careTypes: [],
    organization: "",

    certifications: "",
    certificationList: "",
    skills: [],
    languages: "",

    availability: "",
    hours: "",
    weekends: "",
    location: "",

    medical: "",
    criminal: "",
    emergency: "",

    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value;
    const list = form[field as keyof FormData] as string[];

    if (e.target.checked) {
      setForm({ ...form, [field]: [...list, value] });
    } else {
      setForm({
        ...form,
        [field]: list.filter((item) => item !== value),
      });
    }
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm({ ...form, photo: e.target.files[0] });
    }
  };

 

  // inside component
const handleSubmit = async (e: FormEvent) => {
 e.preventDefault();

  try {
    const response = await axios.post(
      //save data. call to backend
      `${API_BASE_URL}/caregivers/register`,
      form
    );

    console.log(response.data.caregiverId);
    alert("Registration successful!");

     // Redirect to login page
    navigate("/quize/"+response.data.caregiverId);

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
          Caregiver Registration
        </h2>

        {/* Personal Info */}
        <div>
          <h3 className="font-semibold mb-2">Personal Information</h3>
          <label className="label">First Name</label>
          <input name="firstName" placeholder="First Name" onChange={handleChange} className="input" />
          <label className="label">Last Name</label>
          <input name="lastName" placeholder="Last Name" onChange={handleChange} className="input" />
          <label className="label">Birth Date</label>
          <input type="date" name="dob" onChange={handleChange} className="input" />
          <label className="label">Gender</label>
          <select name="gender" onChange={handleChange} className="input">
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <label className="label">Passport / Driving License</label>
          <input name="nic" placeholder="Passport / Driving License" onChange={handleChange} className="input" />

          <label className="label">Profile Picture</label>
          <input type="file" onChange={handleFile} className="input" />
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-2">Contact Details</h3>
          <label className="label">Mobile</label>
          <input name="mobile" placeholder="Mobile" onChange={handleChange} className="input" />
          <label className="label">Email</label>
          <input name="email" placeholder="Email" onChange={handleChange} className="input" />
          <label className="label">Address</label>
          <input name="address" placeholder="Address" onChange={handleChange} className="input" />
          <label className="label">City</label>
          <input name="city" placeholder="City" onChange={handleChange} className="input" />
        </div>

        {/* Professional */}
        <div>
          <h3 className="font-semibold mb-2">Professional Information</h3>
          
          <label className="label">Select Years of Experience</label>
          <select name="years" onChange={handleChange} className="input" >
          <option value="">Years of Experience?</option>
            <option>3 years or more</option>
            <option>2–3 years</option>
            <option>1–2 years</option>
            <option>6 months–1 year</option>
            <option>Less than 6 months</option>
            <option>No experience</option>
          </select>

          <div>
            
            <label className="label">Expertise Care Types:<br/></label>
            {["Elderly Care", "Child Care", "Disability Care", "Medical Assistance"].map((type) => (
              <label key={type} className="mr-3 px-3">
                <input type="checkbox" value={type} onChange={(e) => handleCheckbox(e, "careTypes")} /> {type}
              </label>
            ))}
          </div>

        </div>

        {/* Skills */}
        <div>
          <h3 className="font-semibold mb-2">Skills & Qualifications</h3>
            <label className="label">Qualifications</label>
          <select name="certifications" onChange={handleChange} className="input">
            <option value="">Select Highest Qualification</option>
            <option>Masters degree or higher (relevant field)</option>
            <option>Bachelors degree (relevant field)</option>
            <option>Bachelors degree (non-relevant field)</option>
            <option>Diploma / HND (relevant field)</option>
            <option>Diploma / HND (non-relevant field)</option>
            <option>Certificate III or IV (relevant field)</option>
            <option>Certificate I or II</option>
            <option>No formal qualification</option>
          </select>

            <label className="label">Additional Qualification</label>
          <input name="certificationList" placeholder="List certifications" onChange={handleChange} className="input" />

          <div>
            <label className="label">Skills:<br/></label>
            
            {["First Aid", "CPR", "Medication Handling", "Patient Hygiene"].map((skill) => (
              <label key={skill} className="mr-3 px-3">
                <input type="checkbox" value={skill} onChange={(e) => handleCheckbox(e, "skills")} /> {skill}
              </label>
            ))}
          </div>
            <label className="label">Languages Skills:</label>
          <input name="languages" placeholder="Languages" onChange={handleChange} className="input" />
        </div>

        {/* Availability */}
        <div>
          <h3 className="font-semibold mb-2">Availability</h3>
          <input name="availability" placeholder="Full-time / Part-time" onChange={handleChange} className="input" />
          <input name="hours" placeholder="Working Hours" onChange={handleChange} className="input" />
          <select name="weekends" onChange={handleChange} className="input">
            <option value="">Weekends?</option>
            <option>Yes</option>
            <option>No</option>
          </select>
          <input name="location" placeholder="Preferred Location" onChange={handleChange} className="input" />
        </div>

        {/* Health */}
        <div>
          <h3 className="font-semibold mb-2">Health & Background</h3>
          <input name="medical" placeholder="Medical Conditions (Optional)" onChange={handleChange} className="input" />
          <select name="criminal" onChange={handleChange} className="input">
            <option value="">Criminal Record?</option>
            <option>Yes</option>
            <option>No</option>
          </select>
          <input name="emergency" placeholder="Emergency Contact" onChange={handleChange} className="input" />
        </div>

        {/* Account */}
        <div>
          <h3 className="font-semibold mb-2">Account Setup</h3>
          <input name="username" placeholder="Username" onChange={handleChange} className="input" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="input" />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="input" />
        </div>

        <button className="w-full bg-[#00a63e] text-white py-3 rounded-lg hover:bg-[#008a33]">
          Register & go to Quiz
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
