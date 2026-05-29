import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Onboarding = () => {
  const { caregiverId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    caregiverId: caregiverId || "",

    current_work_status: "",
    looking_for_work: "",
    applied_jobs_4weeks: "",
    industry_interest: "",

    speak_other_language: "",
    other_language: "",

    heard_about_app: "",
    reason_for_joining: "",
    care_for: "",
    cared_person_age_range: "",
    care_categories: "",
    caregiving_duration: "",
  });

  const [loading, setLoading] = useState(false);

  // ===========================
  // Handle Change
  // ===========================
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ===========================
  // Get Existing Data
  // ===========================
  useEffect(() => {
    fetchOnboardingData();
  }, []);

  const fetchOnboardingData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/caregivers/onboarding/${caregiverId}`
      );

      if (res.data.data) {
        setFormData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ===========================
  // Submit Form
  // ===========================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      // check existing
      const check = await axios.get(
        `http://localhost:5000/api/caregivers/onboarding/${caregiverId}`
      );

      if (check.data.data) {
        // update
        await axios.put(
          `http://localhost:5000/api/caregivers/onboarding/${caregiverId}`,
          formData
        );

        alert("Onboarding updated successfully");
      } else {
        // insert
        await axios.post(
          `http://localhost:5000/api/caregivers/onboarding`,
          formData
        );
        console.log(formData);
        alert("Onboarding saved successfully");
      }

      navigate("/signin");

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Caregiver Onboarding
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white shadow-lg rounded-xl p-6"
      >

        {/* Hidden Worker Status */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Hidden Worker Status
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <label className="block mb-1 font-medium">
                Are you working at the moment?
              </label>

              <select
                name="current_work_status"
                value={formData.current_work_status}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              >
                <option value="">Select</option>
                <option value="Yes FT">Yes FT</option>
                <option value="Yes PT">Yes PT</option>
                <option value="Casual">Casual</option>
                <option value="No">No</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Are you looking for work?
              </label>

              <select
                name="looking_for_work"
                value={formData.looking_for_work}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              >
                <option value="">Select</option>
                <option value="Y">Yes</option>
                <option value="N">No</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Have you applied for jobs within 4 weeks?
              </label>

              <select
                name="applied_jobs_4weeks"
                value={formData.applied_jobs_4weeks}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              >
                <option value="">Select</option>
                <option value="Y">Yes</option>
                <option value="N">No</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Industry Interest
              </label>

              <input
                type="text"
                name="industry_interest"
                value={formData.industry_interest}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

          </div>
        </div>

        {/* CALD Status */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            CALD Status
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <label className="block mb-1 font-medium">
                Speak language other than English?
              </label>

              <select
                name="speak_other_language"
                value={formData.speak_other_language}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              >
                <option value="">Select</option>
                <option value="Y">Yes</option>
                <option value="N">No</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Which language?
              </label>

              <select
                name="other_language"
                value={formData.other_language}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              >
                <option value="">Select</option>
                <option value="Mandarin">Mandarin</option>
                <option value="Arabic">Arabic</option>
                <option value="Vietnamese">Vietnamese</option>
                <option value="Cantonese">Cantonese</option>
                <option value="German">German</option>
                <option value="Italian">Italian</option>
                <option value="Hindi">Hindi</option>
                <option value="Greek">Greek</option>
                <option value="Spanish">Spanish</option>
                <option value="Nepali">Nepali</option>
              </select>
            </div>

          </div>
        </div>

        {/* Caregiving Information */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Caregiving Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <label className="block mb-1 font-medium">
                How did you hear about this app?
              </label>

              <input
                type="text"
                name="heard_about_app"
                value={formData.heard_about_app}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                What brings you here?
              </label>

              <input
                type="text"
                name="reason_for_joining"
                value={formData.reason_for_joining}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Who do you care for?
              </label>

              <input
                type="text"
                name="care_for"
                value={formData.care_for}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Age of person you care for
              </label>

              <select
                name="cared_person_age_range"
                value={formData.cared_person_age_range}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              >
                <option value="">Select</option>
                <option value="Under 18">Under 18</option>
                <option value="20-30">20-30</option>
                <option value="30-40">30-40</option>
                <option value="40-50">40-50</option>
                <option value="50+">50+</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Care Categories
              </label>

              <input
                type="text"
                name="care_categories"
                value={formData.care_categories}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="Dementia, Palliative care..."
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                How long have you cared?
              </label>

              <select
                name="caregiving_duration"
                value={formData.caregiving_duration}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              >
                <option value="">Select</option>
                <option value="Less than 1 year">
                  Less than 1 year
                </option>
                <option value="1-3 years">1-3 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5-7 years">5-7 years</option>
                <option value="7-10 years">7-10 years</option>
                <option value="Over 10 years">
                  Over 10 years
                </option>
              </select>
            </div>

          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          {loading ? "Saving..." : "Save Onboarding"}
        </button>

      </form>
    </div>
  );
};

export default Onboarding;