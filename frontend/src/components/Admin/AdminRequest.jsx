<<<<<<< HEAD
import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../General/NavBar";
import { FaSignInAlt, FaUserAlt, FaExchangeAlt, FaEye, FaCheck, FaTimes } from "react-icons/fa";

import { useAppContext } from "../../context/AppContext";

export default function LandingPage() {
  const { loggedInUser, isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const navigations = isLoggedIn
    ? [
        { name: "Users", route: "/admin/", icon: <FaUserAlt/> },
        { name: "Request", route: "/admin/requests", icon: <FaExchangeAlt /> },
      ]
    : [{ name: "Login", route: "/login", icon: <FaSignInAlt /> }];

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-600 overflow-x-hidden">
      <NavBar navigations={navigations} role={"admin"} title={"Skill Swap | Admin"} showuserimg={isLoggedIn} />
      <Home2 />
    </div>
  );
}

function Home2() {
  const navigate = useNavigate();
  const { loggedInUser, isLoggedIn } = useAppContext();
  
  // Simple requests data
  const dummyRequests = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    requesterName: `User ${i + 1}`,
    recipientName: `User ${i + 10}`,
    skillOffered: ["HTML", "CSS", "React", "JavaScript", "Python", "Java", "Design", "UI/UX"][i % 8],
    skillRequested: ["Design", "Python", "UI/UX", "React", "Node.js", "MongoDB", "AWS", "Docker"][i % 8],
    status: i % 4 === 0 ? "pending" : i % 6 === 0 ? "accepted" : i % 8 === 0 ? "rejected" : "pending",
    requestDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString(),
    message: `I'd like to exchange skills with you.`,
  }));

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loadIndex, setLoadIndex] = useState(10);
  const observer = useRef();

  const lastCardRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          setLoadIndex((prev) => prev + 10);
        }, 500);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  const filtered = dummyRequests.filter((request) => {
    const matchesSearch =
      request.requesterName.toLowerCase().includes(search.toLowerCase()) ||
      request.recipientName.toLowerCase().includes(search.toLowerCase()) ||
      request.skillOffered.toLowerCase().includes(search.toLowerCase()) ||
      request.skillRequested.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || request.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const requestsToShow = filtered.slice(0, loadIndex);

  function handleRequestAction(request, action) {
    if (!isLoggedIn) {
      window.alert("Please login to perform admin actions");
      navigate("/login");
      return;
    }
    
    switch(action) {
      case 'approve':
        if (window.confirm(`Approve request from ${request.requesterName}?`)) {
          alert(`Request approved`);
        }
        break;
      case 'reject':
        if (window.confirm(`Reject request from ${request.requesterName}?`)) {
          alert(`Request rejected`);
        }
        break;
    }
  }

  return (
    <>
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row items-center justify-end m-2 bg-gray-500 gap-3 px-4 py-2 rounded-md">
        <input
          type="text"
          placeholder="Search requests..."
          className="px-3 py-1 rounded-md border focus:outline-none focus:ring-2 focus:ring-red-300 w-full md:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="px-3 py-1 rounded-md border focus:outline-none focus:ring-2 focus:ring-red-300 w-full md:w-48"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Statistics */}
      <div className="m-2 bg-gray-500 rounded-md p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-gray-600 rounded-lg p-3">
            <div className="text-2xl font-bold text-white">{dummyRequests.length}</div>
            <div className="text-sm text-gray-300">Total Requests</div>
          </div>
          <div className="bg-yellow-600 rounded-lg p-3">
            <div className="text-2xl font-bold text-white">{dummyRequests.filter(r => r.status === 'pending').length}</div>
            <div className="text-sm text-gray-300">Pending</div>
          </div>
          <div className="bg-green-600 rounded-lg p-3">
            <div className="text-2xl font-bold text-white">{dummyRequests.filter(r => r.status === 'accepted').length}</div>
            <div className="text-sm text-gray-300">Accepted</div>
          </div>
          <div className="bg-red-600 rounded-lg p-3">
            <div className="text-2xl font-bold text-white">{dummyRequests.filter(r => r.status === 'rejected').length}</div>
            <div className="text-sm text-gray-300">Rejected</div>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="flex flex-col max-w-[100%] h-full space-y-2 pt-2 bg-gray-500 m-2 rounded-md overflow-y-auto">
        {requestsToShow.map((request, i) => {
          const isLast = i === requestsToShow.length - 1;
          return (
            <div key={request.id} ref={isLast ? lastCardRef : null}>
              <RequestCard
                request={request}
                onAction={handleRequestAction}
              />
            </div>
          );
        })}
        {requestsToShow.length < filtered.length && (
          <p className="text-center text-white py-4 animate-pulse">Loading more...</p>
        )}
        {filtered.length === 0 && (
          <p className="text-center text-gray-200 py-4">No requests found.</p>
        )}
      </div>
    </>
  );
}

function RequestCard({ request, onAction }) {
  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-500';
      case 'accepted': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-gray-600 rounded-lg p-4 m-2 shadow-md">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold">Request #{request.id}</span>
            <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(request.status)}`}>
              {request.status}
            </span>
          </div>
          
          <div className="text-sm text-gray-300">
            <strong>{request.requesterName}</strong> → <strong>{request.recipientName}</strong>
          </div>
          
          <div className="text-sm">
            <span className="text-blue-400">{request.skillOffered}</span> 
            <span className="text-gray-400"> for </span>
            <span className="text-green-400">{request.skillRequested}</span>
          </div>
          
          <div className="text-xs text-gray-400">
            {request.requestDate}
          </div>
        </div>

        {request.status === 'pending' && (
          <div className="flex gap-2">
            <button
              onClick={() => onAction(request, 'approve')}
              className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
            >
              <FaCheck /> Approve
            </button>
            <button
              onClick={() => onAction(request, 'reject')}
              className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
            >
              <FaTimes /> Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
=======
import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../General/NavBar";
import { FaSignInAlt, FaUserAlt, FaExchangeAlt, FaEye, FaCheck, FaTimes } from "react-icons/fa";

import { useAppContext } from "../../context/AppContext";

export default function LandingPage() {
  const { loggedInUser, isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const navigations = isLoggedIn
    ? [
        { name: "Users", route: "/admin/", icon: <FaUserAlt/> },
        { name: "Request", route: "/admin/requests", icon: <FaExchangeAlt /> },
      ]
    : [{ name: "Login", route: "/login", icon: <FaSignInAlt /> }];

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-600 overflow-x-hidden">
      <NavBar navigations={navigations} role={"admin"} title={"Skill Swap | Admin"} showuserimg={isLoggedIn} />
      <Home2 />
    </div>
  );
}

function Home2() {
  const navigate = useNavigate();
  const { loggedInUser, isLoggedIn } = useAppContext();
  
  // Simple requests data
  const dummyRequests = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    requesterName: `User ${i + 1}`,
    recipientName: `User ${i + 10}`,
    skillOffered: ["HTML", "CSS", "React", "JavaScript", "Python", "Java", "Design", "UI/UX"][i % 8],
    skillRequested: ["Design", "Python", "UI/UX", "React", "Node.js", "MongoDB", "AWS", "Docker"][i % 8],
    status: i % 4 === 0 ? "pending" : i % 6 === 0 ? "accepted" : i % 8 === 0 ? "rejected" : "pending",
    requestDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString(),
    message: `I'd like to exchange skills with you.`,
  }));

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loadIndex, setLoadIndex] = useState(10);
  const observer = useRef();

  const lastCardRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          setLoadIndex((prev) => prev + 10);
        }, 500);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  const filtered = dummyRequests.filter((request) => {
    const matchesSearch =
      request.requesterName.toLowerCase().includes(search.toLowerCase()) ||
      request.recipientName.toLowerCase().includes(search.toLowerCase()) ||
      request.skillOffered.toLowerCase().includes(search.toLowerCase()) ||
      request.skillRequested.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || request.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const requestsToShow = filtered.slice(0, loadIndex);

  function handleRequestAction(request, action) {
    if (!isLoggedIn) {
      window.alert("Please login to perform admin actions");
      navigate("/login");
      return;
    }
    
    switch(action) {
      case 'approve':
        if (window.confirm(`Approve request from ${request.requesterName}?`)) {
          alert(`Request approved`);
        }
        break;
      case 'reject':
        if (window.confirm(`Reject request from ${request.requesterName}?`)) {
          alert(`Request rejected`);
        }
        break;
    }
  }

  return (
    <>
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row items-center justify-end m-2 bg-gray-500 gap-3 px-4 py-2 rounded-md">
        <input
          type="text"
          placeholder="Search requests..."
          className="px-3 py-1 rounded-md border focus:outline-none focus:ring-2 focus:ring-red-300 w-full md:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="px-3 py-1 rounded-md border focus:outline-none focus:ring-2 focus:ring-red-300 w-full md:w-48"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Statistics */}
      <div className="m-2 bg-gray-500 rounded-md p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-gray-600 rounded-lg p-3">
            <div className="text-2xl font-bold text-white">{dummyRequests.length}</div>
            <div className="text-sm text-gray-300">Total Requests</div>
          </div>
          <div className="bg-yellow-600 rounded-lg p-3">
            <div className="text-2xl font-bold text-white">{dummyRequests.filter(r => r.status === 'pending').length}</div>
            <div className="text-sm text-gray-300">Pending</div>
          </div>
          <div className="bg-green-600 rounded-lg p-3">
            <div className="text-2xl font-bold text-white">{dummyRequests.filter(r => r.status === 'accepted').length}</div>
            <div className="text-sm text-gray-300">Accepted</div>
          </div>
          <div className="bg-red-600 rounded-lg p-3">
            <div className="text-2xl font-bold text-white">{dummyRequests.filter(r => r.status === 'rejected').length}</div>
            <div className="text-sm text-gray-300">Rejected</div>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="flex flex-col max-w-[100%] h-full space-y-2 pt-2 bg-gray-500 m-2 rounded-md overflow-y-auto">
        {requestsToShow.map((request, i) => {
          const isLast = i === requestsToShow.length - 1;
          return (
            <div key={request.id} ref={isLast ? lastCardRef : null}>
              <RequestCard
                request={request}
                onAction={handleRequestAction}
              />
            </div>
          );
        })}
        {requestsToShow.length < filtered.length && (
          <p className="text-center text-white py-4 animate-pulse">Loading more...</p>
        )}
        {filtered.length === 0 && (
          <p className="text-center text-gray-200 py-4">No requests found.</p>
        )}
      </div>
    </>
  );
}

function RequestCard({ request, onAction }) {
  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-500';
      case 'accepted': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-gray-600 rounded-lg p-4 m-2 shadow-md">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold">Request #{request.id}</span>
            <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(request.status)}`}>
              {request.status}
            </span>
          </div>
          
          <div className="text-sm text-gray-300">
            <strong>{request.requesterName}</strong> → <strong>{request.recipientName}</strong>
          </div>
          
          <div className="text-sm">
            <span className="text-blue-400">{request.skillOffered}</span> 
            <span className="text-gray-400"> for </span>
            <span className="text-green-400">{request.skillRequested}</span>
          </div>
          
          <div className="text-xs text-gray-400">
            {request.requestDate}
          </div>
        </div>

        {request.status === 'pending' && (
          <div className="flex gap-2">
            <button
              onClick={() => onAction(request, 'approve')}
              className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
            >
              <FaCheck /> Approve
            </button>
            <button
              onClick={() => onAction(request, 'reject')}
              className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
            >
              <FaTimes /> Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
>>>>>>> c02fd4fcf823458862d463d0bf1d1e478d28bffa
}