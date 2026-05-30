import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Search,
  Pencil,
  Trash2,
  RefreshCw,
  Filter,Eye
} from "lucide-react";

interface Caregiver {
  id: number;
  first_name: string;
  last_name: string;
  mobile: string;
  email: string;
  city: string;
  status: string;
  dob: string;
  address: string;
}

const CaregiverList = () => {
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
const [rowsPerPage] = useState(5);

  const [loading, setLoading] = useState(false);

  const API = "http://localhost:5000/API/caregivers";

  const navigate = useNavigate();

  
  /* =========================
      LOAD ALL CaregiverS
  ========================= */
  const loadCaregivers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API);
      console.log(res);
      setCaregivers(res.data);
    } catch (err) {
      console.error(err);
      alert("Error loading Caregivers");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
      SEARCH
  ========================= */
  const searchCaregivers = async () => {
    try {
      if (!search.trim()) {
        loadCaregivers();
        return;
      }

      setLoading(true);

      const res = await axios.get(
        `${API}/search/${search}`
      );
console.log(res)
      setCaregivers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
      FILTER
  ========================= */
  const filterCaregivers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/filter/data`,
        {
          params: {
            city,
            status,
          },
        }
      );

      setCaregivers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
      DELETE
  ========================= */
  const deleteCaregiver = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure to delete this Caregiver?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/${id}`);

      alert("Caregiver deleted successfully");

      loadCaregivers();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const viewCaregiver= async (id: number,attempt:number) => {
    if(attempt){
    const confirmView = window.confirm(
      "Are you sure to view this Caregiver Certificate?"
    );

    if (!confirmView) return;

    try {
      
      // Redirect to dashboard page
      navigate("/admin/certificate/"+id+"/"+attempt);
    } catch (err) {
      console.error(err);
      alert("View failed");
    }
  }
  };

  /* =========================
      UPDATE STATUS
  ========================= */
  const toggleStatus = async (
    caregiver: Caregiver
  ) => {
    try {
      const newStatus =
        caregiver.status === "ACT"
          ? "INA"
          : "ACT";

      await axios.put(`${API}/${caregiver.id}`, {
        firstName: caregiver.first_name,
        lastName: caregiver.last_name,
        dob: caregiver.dob,
        mobile: caregiver.mobile,
        email: caregiver.email,
        city: caregiver.city,
        address: caregiver.address,
        status: newStatus,
      });

      loadCaregivers();
    } catch (err) {
      console.error(err);
      alert("Status update failed");
    }
  };

  useEffect(() => {
    loadCaregivers();
  }, []);

  // Pagination calculations
const indexOfLastRow = currentPage * rowsPerPage;
const indexOfFirstRow = indexOfLastRow - rowsPerPage;

const currentRows = caregivers.slice(
  indexOfFirstRow,
  indexOfLastRow
);

const totalPages = Math.ceil(
  caregivers.length / rowsPerPage
);

// Change page
const paginate = (pageNumber: number) => {
  setCurrentPage(pageNumber);
};

  return (
    <div className="p-6 bg-gray-100 min-h-screen pt-15">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Caregiver Management
        </h1>

        <button
          onClick={loadCaregivers}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xs flex items-center gap-2"
        >
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>

      {/* SEARCH + FILTER */}
      <div className="bg-white rounded-2xl shadow-md p-5 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          {/* SEARCH */}
          <div className="flex relative">
            <Search
              className="absolute top-3 left-3 text-gray-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search Caregiver..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border border-gray-300 rounded-xs pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={searchCaregivers}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xs flex items-center gap-2"
            >
              <Search size={18} />
              Search
            </button>
          </div>

            <div className="flex ">
          {/* CITY FILTER */}
          <input
            type="text"
            placeholder="Filter by Postcode"
            value={city}
            onChange={(e) =>
              setCity(e.target.value)
            }
            className="w-full border border-gray-300 rounded-xs px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* STATUS FILTER */}
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="w-full border border-gray-300 rounded-xs px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="ACT">Active</option>
            <option value="INA">Inactive</option>
            <option value="DEL">Deleted</option>
          </select>

          {/* BUTTONS */}
         

            <button
              onClick={filterCaregivers}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xs flex items-center gap-2"
            >
              <Filter size={18} />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-green-800 text-white">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">
                  Name
                </th>
                
                <th className="p-3 text-left">
                  Mobile
                </th>
                <th className="p-3 text-left">
                  Email
                </th>
                <th className="p-3 text-left">
                  Postcode
                </th>
                <th className="p-3 text-left">
                  Status
                </th>
                <th className="p-3 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center p-10"
                  >
                    Loading...
                  </td>
                </tr>
              ) : caregivers.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center p-10 text-gray-500"
                  >
                    No caregivers found
                  </td>
                </tr>
              ) : (
                currentRows.map((car) => (
                  <tr
                    key={car.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3">
                      {car.id}
                    </td>

                    <td className="p-3 font-medium">
                      {car.first_name}{" "}
                      {car.last_name}
                    </td>

                    

                    <td className="p-3">
                      {car.mobile}
                    </td>

                    <td className="p-3">
                      {car.email}
                    </td>

                    <td className="p-3">
                      {car.city}
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() =>
                          toggleStatus(car)
                        }
                        className={`px-3 py-1 rounded-full text-sm font-semibold
                        ${
                          car.status === "ACT"
                            ? "bg-green-100 text-green-700"
                            : car.status === "INA"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {car.status}
                      </button>
                    </td>

                    <td className="p-3">
                      <div className="flex justify-center gap-3">
                        {/* EDIT */}
                        <button
                          className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-xsg"
                          onClick={() =>
                            alert(
                              `Edit Caregiver ID ${car.id}`
                            )
                          }
                        >
                          <Pencil size={18} />
                        </button>

                        {/* DELETE */}
                        <button
                          className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-xsg"
                          onClick={() =>
                            deleteCaregiver(
                              car.id
                            )
                          }
                        >
                          <Trash2 size={18} />
                        </button>
                         <button
                          className="bg-purple-100 hover:bg-red-200 text-purple-700 p-2 rounded-xsg"
                          onClick={() =>
                            viewCaregiver(
                              car.id,car.attempt
                            )
                          }
                        >
                          <Eye size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* PAGINATION */}
<div className="flex justify-between items-center mt-5 px-4 py-3">
  
  {/* PAGE INFO */}
  <div className="text-sm text-gray-600">
    Showing {indexOfFirstRow + 1} -
    {" "}
    {Math.min(indexOfLastRow, caregivers.length)}
    {" "}of {caregivers.length}
  </div>

  {/* BUTTONS */}
  <div className="flex gap-2">
    
    {/* PREVIOUS */}
    <button
      onClick={() =>
        setCurrentPage((prev) =>
          Math.max(prev - 1, 1)
        )
      }
      disabled={currentPage === 1}
      className={`px-4 py-2 rounded-lg border
      ${
        currentPage === 1
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-white hover:bg-gray-100"
      }`}
    >
      Previous
    </button>

    {/* PAGE NUMBERS */}
    {[...Array(totalPages)].map((_, index) => (
      <button
        key={index}
        onClick={() =>
          paginate(index + 1)
        }
        className={`px-4 py-2 rounded-lg border
        ${
          currentPage === index + 1
            ? "bg-blue-600 text-white"
            : "bg-white hover:bg-gray-100"
        }`}
      >
        {index + 1}
      </button>
    ))}

    {/* NEXT */}
    <button
      onClick={() =>
        setCurrentPage((prev) =>
          Math.min(prev + 1, totalPages)
        )
      }
      disabled={currentPage === totalPages}
      className={`px-4 py-2 rounded-lg border
      ${
        currentPage === totalPages
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-white hover:bg-gray-100"
      }`}
    >
      Next
    </button>
  </div>
</div>
      </div>
    </div>
  );
};

export default CaregiverList;