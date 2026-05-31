// components/MyProfile.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000/api";

interface Caregiver {
  id: number;
  first_name: string;
  last_name: string;
  dob: string;
  gender: string;
  nic_passport: string;
  photo: string;
  mobile: string;
  email: string;
  address: string;
  city: string;
  experience_years: string;
  organization: string;
  has_certifications: string;
  certification_list: string;
  languages: string;
  availability: string;
  working_hours: string;
  weekends: string;
  preferred_location: string;
  medical_conditions: string;
  criminal_record: string;
  emergency_contact: string;
  username: string;
  created_at: string;
}

interface Onboarding {
  current_work_status: string;
  looking_for_work: string;
  applied_jobs_4weeks: string;
  industry_interest: string;

  speak_other_language: string;
  other_language: string;

  heard_about_app: string;
  reason_for_joining: string;

  care_for: string;
  cared_person_age_range: string;
  care_categories: string;
  caregiving_duration: string;
}

const MyProfile = () => {

  const { myid } = useParams();

  const [caregiver, setCaregiver] = useState<Caregiver | null>(null);

  const [onboarding, setOnboarding] =
    useState<Onboarding | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {

      try {

        // ==========================
        // Get Caregiver Details
        // ==========================
        const caregiverRes = await axios.get(
          `${API_BASE_URL}/caregivers/getone/${myid}`
        );

        setCaregiver(caregiverRes.data[0]);

        // ==========================
        // Get Onboarding Details
        // ==========================
        const onboardingRes = await axios.get(
          `${API_BASE_URL}/caregivers/onboarding/${myid}`
        );

        if (onboardingRes.data.data) {
          setOnboarding(onboardingRes.data.data);
        }

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    fetchData();

  }, [myid]);

  if (loading) {
    return (
      <div className="p-6 text-center text-lg">
        Loading...
      </div>
    );
  }

  if (!caregiver) {
    return (
      <div className="p-6 text-center text-red-500">
        No caregiver found
      </div>
    );
  }

  return (

    <div className="max-w-6xl mx-auto p-6 pt-12">

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">

        {/* ========================= */}
        {/* Header */}
        {/* ========================= */}

        <div className="bg-[#8E8E90] text-white p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

          <div>

            <h1 className="text-4xl font-bold">
              {caregiver.first_name} {caregiver.last_name}
            </h1>

            <p className="mt-2 text-gray-100">
              {caregiver.email}
            </p>

            <p className="text-gray-100">
              {caregiver.mobile}
            </p>

          </div>

          <Link
            to={`/editonboarding/${myid}`}
            className="bg-white text-gray-700 px-5 py-3 rounded-xl font-medium hover:bg-gray-100 transition"
          >
            Edit Onboarding
          </Link>

        </div>

        {/* ========================= */}
        {/* Body */}
        {/* ========================= */}

        <div className="p-8 space-y-10">

          {/* ========================= */}
          {/* Personal Information */}
          {/* ========================= */}

          <div>

            <h2 className="text-2xl font-semibold mb-5 border-b pb-2">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <p>
                <strong>Date of Birth:</strong>{" "}
                {caregiver.dob?.split("T")[0]}
              </p>

              <p>
                <strong>Gender:</strong>{" "}
                {caregiver.gender}
              </p>

              <p>
                <strong>NIC / Passport:</strong>{" "}
                {caregiver.nic_passport}
              </p>

              <p>
                <strong>Address:</strong>{" "}
                {caregiver.address}
              </p>

              <p>
                <strong>Postcode:</strong>{" "}
                {caregiver.city}
              </p>

              <p>
                <strong>Created At:</strong>{" "}
                {caregiver.created_at?.split("T")[0]}
              </p>

            </div>

          </div>

          {/* ========================= */}
          {/* Account Information */}
          {/* ========================= */}

      

          {/* ========================= */}
          {/* Onboarding Information */}
          {/* ========================= */}

          <div>

            <h2 className="text-2xl font-semibold mb-5 border-b pb-2">
              Onboarding Information
            </h2>

            {onboarding ? (

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <p>
                  <strong>Current Work Status:</strong>{" "}
                  {onboarding.current_work_status}
                </p>

                <p>
                  <strong>Looking For Work:</strong>{" "}
                  {onboarding.looking_for_work}
                </p>

                <p>
                  <strong>Applied Jobs Within 4 Weeks:</strong>{" "}
                  {onboarding.applied_jobs_4weeks}
                </p>

                <p>
                  <strong>Industry Interest:</strong>{" "}
                  {onboarding.industry_interest}
                </p>

                <p>
                  <strong>Speak Other Language:</strong>{" "}
                  {onboarding.speak_other_language}
                </p>

                <p>
                  <strong>Other Language:</strong>{" "}
                  {onboarding.other_language}
                </p>

                <p>
                  <strong>Heard About App:</strong>{" "}
                  {onboarding.heard_about_app}
                </p>

                <p>
                  <strong>Reason For Joining:</strong>{" "}
                  {onboarding.reason_for_joining}
                </p>

                <p>
                  <strong>Care For:</strong>{" "}
                  {onboarding.care_for}
                </p>

                <p>
                  <strong>Age Range:</strong>{" "}
                  {onboarding.cared_person_age_range}
                </p>

                <p>
                  <strong>Care Categories:</strong>{" "}
                  {onboarding.care_categories}
                </p>

                <p>
                  <strong>Caregiving Duration:</strong>{" "}
                  {onboarding.caregiving_duration}
                </p>

              </div>

            ) : (

              <div className="bg-yellow-50 border border-yellow-300 p-5 rounded-xl">

                <p className="text-yellow-700">
                  No onboarding information available.
                </p>

                <Link
                  to={`/onboarding/${myid}`}
                  className="inline-block mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                >
                  Add Onboarding
                </Link>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>

  );
};

export default MyProfile;