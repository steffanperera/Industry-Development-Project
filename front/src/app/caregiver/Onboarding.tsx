import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Onboarding = () => {

  const { caregiverId } = useParams();
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);

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

  // =================================
  // Handle Input Change
  // =================================
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

  // =================================
  // Load Existing Data
  // =================================
  useEffect(() => {
    fetchOnboardingData();
  }, []);

const fetchOnboardingData = async () => {

  try {

    const res = await axios.get(
      `http://localhost:5000/api/caregivers/onboarding/${caregiverId}`
    );

    if (res.data.data) {

      const data = res.data.data;

      setFormData({
        caregiverId: caregiverId || "",

        current_work_status: data.current_work_status || "",
        looking_for_work: data.looking_for_work || "",
        applied_jobs_4weeks: data.applied_jobs_4weeks || "",
        industry_interest: data.industry_interest || "",

        speak_other_language: data.speak_other_language || "",
        other_language: data.other_language || "",

        heard_about_app: data.heard_about_app || "",
        reason_for_joining: data.reason_for_joining || "",

        care_for: data.care_for || "",
        cared_person_age_range: data.cared_person_age_range || "",

        care_categories: data.care_categories || "",
        caregiving_duration: data.caregiving_duration || "",
      });

      setIsEditMode(true);
    }

  } catch (error) {

    console.log(error);

  }

};

  // =================================
  // Submit Form
  // =================================
  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    setLoading(true);

    try {

      if (isEditMode) {

        // UPDATE
        await axios.put(
          `http://localhost:5000/api/caregivers/onboarding/${caregiverId}`,
          formData
        );

        alert("Onboarding updated successfully");

      } else {

        // INSERT
        await axios.post(
          `http://localhost:5000/api/caregivers/onboarding`,
          formData
        );

        alert("Onboarding saved successfully");
      }

      navigate("/editonboarding/"+caregiverId);

    } catch (error) {

      console.log(error);
      alert("Something went wrong");

    }

    setLoading(false);

  };

  return (

    <div className="max-w-6xl mx-auto p-6">

      <div className="bg-white shadow-xl rounded-2xl p-8">

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-800">
            {isEditMode
              ? "Edit Caregiver Onboarding"
              : "Caregiver Onboarding"}
          </h1>

          <p className="text-gray-500 mt-2">
            Complete caregiver onboarding information.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-10"
        >

          {/* ========================== */}
          {/* Hidden Worker Status */}
          {/* ========================== */}

          <div>

            <h2 className="text-xl font-semibold border-b pb-2 mb-5">
              Hidden Worker Status
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label className="block mb-2 font-medium">
                  Are you working at the moment?
                </label>

                <select
                  name="current_work_status"
                  value={formData.current_work_status}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                >
                  <option value="">Select</option>
                  <option value="Yes FT">Yes FT</option>
                  <option value="Yes PT">Yes PT</option>
                  <option value="Casual">Casual</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Are you looking for work?
                </label>

                <select
                  name="looking_for_work"
                  value={formData.looking_for_work}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                >
                  <option value="">Select</option>
                  <option value="Y">Yes</option>
                  <option value="N">No</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Applied for jobs within 4 weeks?
                </label>

                <select
                  name="applied_jobs_4weeks"
                  value={formData.applied_jobs_4weeks}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                >
                  <option value="">Select</option>
                  <option value="Y">Yes</option>
                  <option value="N">No</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Industry Interest
                </label>

                <input
                  type="text"
                  name="industry_interest"
                  value={formData.industry_interest}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                  placeholder="Healthcare, Hospitality..."
                />
              </div>

            </div>

          </div>

          {/* ========================== */}
          {/* CALD Status */}
          {/* ========================== */}

          <div>

            <h2 className="text-xl font-semibold border-b pb-2 mb-5">
              CALD Status
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label className="block mb-2 font-medium">
                  Speak language other than English?
                </label>

                <select
                  name="speak_other_language"
                  value={formData.speak_other_language}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                >
                  <option value="">Select</option>
                  <option value="Y">Yes</option>
                  <option value="N">No</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Which language?
                </label>

                <select
                  name="other_language"
                  value={formData.other_language}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
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

          {/* ========================== */}
          {/* Caregiving Information */}
          {/* ========================== */}

          <div>

            <h2 className="text-xl font-semibold border-b pb-2 mb-5">
              Caregiving Information
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label className="block mb-2 font-medium">
                  How did you hear about this app?
                </label>

                <input
                  type="text"
                  name="heard_about_app"
                  value={formData.heard_about_app}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                  placeholder="Partner org, WhatsApp..."
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  What brings you here?
                </label>

                <input
                  type="text"
                  name="reason_for_joining"
                  value={formData.reason_for_joining}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                  placeholder="Looking for support..."
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Who do you care for?
                </label>

                <select
                  name="care_for"
                  value={formData.care_for}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                >
                  <option value="">Select</option>
                  <option value="Parents">Parents</option>
                  <option value="Children">Children</option>
                  <option value="Relative">Relative</option>
                  <option value="Friends">Friends</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Age of person you care for
                </label>

                <select
                  name="cared_person_age_range"
                  value={formData.cared_person_age_range}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
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
                <label className="block mb-2 font-medium">
                  Care Categories
                </label>

                <input
                  type="text"
                  name="care_categories"
                  value={formData.care_categories}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                  placeholder="Dementia, Palliative..."
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  How long have you cared?
                </label>

                <select
                  name="caregiving_duration"
                  value={formData.caregiving_duration}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                >
                  <option value="">Select</option>
                  <option value="Less than 1 year">
                    Less than 1 year
                  </option>

                  <option value="1-3 years">
                    1-3 years
                  </option>

                  <option value="3-5 years">
                    3-5 years
                  </option>

                  <option value="5-7 years">
                    5-7 years
                  </option>

                  <option value="7-10 years">
                    7-10 years
                  </option>

                  <option value="Over 10 years">
                    Over 10 years
                  </option>

                </select>
              </div>

            </div>

          </div>

          {/* ========================== */}
          {/* Submit Button */}
          {/* ========================== */}

          <div className="flex gap-4 pt-4">

            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 rounded-xl text-white font-medium transition
              ${
                isEditMode
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >

              {loading
                ? "Please wait..."
                : isEditMode
                ? "Update Onboarding"
                : "Save Onboarding"}

            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-8 py-3 rounded-xl border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>

  );
};

export default Onboarding;