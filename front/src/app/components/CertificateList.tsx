import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import API_BASE_URL from "../../config/apiConfig";
import { Link } from "react-router-dom";



const CertificateList = () => {

  const { caregiverId } = useParams();


  console.log("Caregiver ID:", caregiverId);

  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState();

  // Fetch questions
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
       
        const res = await axios.get(`${API_BASE_URL}/caregivers/certificatelist/`+caregiverId);
        console.log(res.data);
        
        setCertificates(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

 


  if (loading) return <p>Loading questions...</p>;

  return (
    <div className="min-h-screen p-6 flex justify-center pt-10">
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-[#00a63e] text-center">My Certificates</h2>

    <div className="overflow-x-auto">
  <table className="min-w-full border-collapse border border-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
          #
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
          Certificate ID
        </th>
        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
          Action
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200 bg-white">
      {certificates.map((q, index) => (
        <tr key={index} className="hover:bg-gray-50 transition-colors">
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {index + 1}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {"CA-" + caregiverId + "-" + Math.floor(Number(q.attempt) * 100)}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <Link
              to={`/mycertificate/${caregiverId}/${q.attempt}`}
              className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              View
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      
    </div>
    </div>
  );
};

export default CertificateList;