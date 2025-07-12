// pages/RequestList.jsx
import React, { useState } from "react";
import RequestCard from "../General/RequestCard.jsx";

import { useNavigate } from "react-router-dom";
import NavBar from "../General/NavBar";
import { FaSignInAlt,FaHome,FaExchangeAlt } from "react-icons/fa";

import { useAppContext } from "../../context/AppContext.jsx";

export default function LandingPage() {
    
    const { loggedInUser, isLoggedIn } = useAppContext();
    const navigate = useNavigate();
    const navigations = isLoggedIn
    ? [
        { name: "Home", route: "/", icon: <FaHome /> },
        { name: "Swap Requests", route: "/requests", icon: <FaExchangeAlt /> },
      ]
    : [{ name: "Login", route: "/login", icon: <FaSignInAlt /> }];

    return (
        <div className="h-screen w-screen flex flex-col bg-gray-600 overflow-x-hidden">

            <NavBar navigations={navigations} role={"user"} title={"Skill Swap"} showuserimg={isLoggedIn} />
            <RequestList/>
        </div>
    );
}
function RequestList() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Pending");

  const requests = [
    {
      id: 1,
      name: "Marc Demo",
      profileImage: "",
      skillsOffered: ["JavaScript"],
      skillsWanted: ["Photoshop"],
      rating: 3.9,
      status: "Pending",
    },
    {
      id: 2,
      name: "name",
      profileImage: "",
      skillsOffered: [],
      skillsWanted: [],
      rating: 3.9,
      status: "Rejected",
    },
  ];

  const handleAccept = (id) => {
    alert(`Accepted request ID: ${id}`);
  };

  const handleReject = (id) => {
    alert(`Rejected request ID: ${id}`);
  };

  const filteredRequests = requests.filter(
    (req) =>
      req.status === statusFilter &&
      (req.name.toLowerCase().includes(search.toLowerCase()) ||
        req.skillsOffered.some((s) => s.toLowerCase().includes(search.toLowerCase())) ||
        req.skillsWanted.some((s) => s.toLowerCase().includes(search.toLowerCase())))
  );

  return (
    <>
      <div className="flex flex-col md:flex-row items-center h-auto md:h-12 justify-center m-2 bg-gray-500 md:justify-end mt-4 gap-3 md:gap-6 px-4 py-2 rounded-md shadow">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300 w-full md:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300 w-full md:w-48"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="flex flex-col max-w-[100%] h-full space-y-2 pt-2 bg-gray-500 m-2 rounded-md overflow-y-auto">
        {filteredRequests.map((req) => (
          <RequestCard
            key={req.id}
            name={req.name}
            profileImage={req.profileImage}
            skillsOffered={req.skillsOffered}
            skillsWanted={req.skillsWanted}
            rating={req.rating}
            status={req.status}
            onAccept={() => handleAccept(req.id)}
            onReject={() => handleReject(req.id)}
          />
        ))}
        {filteredRequests.length === 0 && (
          <p className="text-center text-gray-200 py-4">No requests found.</p>
        )}
      </div>
    </>
  );
} 
