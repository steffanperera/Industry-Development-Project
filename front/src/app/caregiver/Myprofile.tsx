import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000/api";

interface Caregiver {
  id: number;
  full_name: string;
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

const MyProfile = () => {
  const { myid } = useParams();
  const [caregiver, setCaregiver] = useState<Caregiver | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaregiver = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/caregivers/getone/${myid}`);
        console.log(res.data);
        setCaregiver(res.data[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaregiver();
  }, [myid]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!caregiver)  return <div className="p-6">No caregiver found</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">

        {/* Header */}
        <div className="bg-[#4E9258] text-white p-6 flex items-center gap-6">
          <img
            src={
              caregiver.photo
                ? `http://localhost:5000/uploads/${caregiver.photo}`
                : "https://via.placeholder.com/120"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-white"
          />
          <div>
            <h1 className="text-3xl font-bold">{caregiver.full_name}</h1>
            <p className="text-blue-100">{caregiver.email}</p>
            <p className="text-blue-100">{caregiver.mobile}</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="space-y-2">
              <p><strong>Date of Birth:</strong> {caregiver.dob?.split("T")[0]}</p>
              <p><strong>Gender:</strong> {caregiver.gender}</p>
              <p><strong>NIC / Passport:</strong> {caregiver.nic_passport}</p>
              <p><strong>Address:</strong> {caregiver.address}</p>
              <p><strong>City:</strong> {caregiver.city}</p>
              <p><strong>Languages:</strong> {caregiver.languages}</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Professional Information</h2>
            <div className="space-y-2">
              <p><strong>Experience:</strong> {caregiver.experience_years}</p>
              <p><strong>Organization:</strong> {caregiver.organization}</p>
              <p><strong>Qualification:</strong> {caregiver.has_certifications}</p>
              <p><strong>Certification List:</strong> {caregiver.certification_list}</p>
              <p><strong>Availability:</strong> {caregiver.availability}</p>
              <p><strong>Working Hours:</strong> {caregiver.working_hours}</p>
              <p><strong>Weekends:</strong> {caregiver.weekends}</p>
              <p><strong>Preferred Location:</strong> {caregiver.preferred_location}</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Health & Safety</h2>
            <div className="space-y-2">
              <p><strong>Medical Conditions:</strong> {caregiver.medical_conditions}</p>
              <p><strong>Criminal Record:</strong> {caregiver.criminal_record}</p>
              <p><strong>Emergency Contact:</strong> {caregiver.emergency_contact}</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Account Information</h2>
            <div className="space-y-2">
              <p><strong>Username:</strong> {caregiver.username}</p>
              <p><strong>Created At:</strong> {caregiver.created_at?.split("T")[0]}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyProfile;
