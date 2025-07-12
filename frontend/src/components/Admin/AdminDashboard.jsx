import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../General/NavBar";
import { FaSignInAlt,FaUserAlt, FaExchangeAlt } from "react-icons/fa";

import { useAppContext } from "../../context/AppContext";
import UserDetailsModal from "./UserDetailsModeal";
import AdminUserCard from "./AdminUserCard";

export default function LandingPage() {
  const { loggedInUser, isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const navigations = isLoggedIn
    ? [
        { name: "Users", route: "/admin/", icon: <FaUserAlt /> },
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
  
  // Dummy users data for admin dashboard
  const dummyUsers = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    profileImage: "",
    skillsOffered: ["HTML", "CSS", "React", "JavaScript", "Python", "Java", "Design", "UI/UX"][i % 8],
    skillsWanted: ["Design", "Python", "UI/UX", "React", "Node.js", "MongoDB", "AWS", "Docker"][i % 8],
    rating: (Math.random() * 2 + 3).toFixed(1),
    availability: i % 2 === 0 ? "public" : i % 3 === 0 ? "private" : "protected",
    joinDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString(),
    status: i % 10 === 0 ? "suspended" : i % 15 === 0 ? "pending" : "active",
    totalRequests: Math.floor(Math.random() * 50),
    completedSwaps: Math.floor(Math.random() * 20),
  }));

  const [search, setSearch] = useState("");
  const [filterAvailability, setFilterAvailability] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loadIndex, setLoadIndex] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
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

  const filtered = dummyUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.skillsOffered.toLowerCase().includes(search.toLowerCase()) ||
      user.skillsWanted.toLowerCase().includes(search.toLowerCase());
    const matchesAvailability = filterAvailability === "all" || user.availability === filterAvailability;
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesAvailability && matchesStatus;
  });

  const usersToShow = filtered.slice(0, loadIndex);

  function handleUserAction(user, action) {
    if (!isLoggedIn) {
      window.alert("Please login to perform admin actions");
      navigate("/login");
      return;
    }
    
    switch(action) {
      case 'view':
        setSelectedUser(user);
        setShowUserDetails(true);
        break;
      case 'suspend':
        if (window.confirm(`Are you sure you want to suspend ${user.name}?`)) {
          console.log('Suspending user:', user.id);
          alert(`User ${user.name} has been suspended`);
        }
        break;
      case 'activate':
        if (window.confirm(`Are you sure you want to activate ${user.name}?`)) {
          console.log('Activating user:', user.id);
          alert(`User ${user.name} has been activated`);
        }
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${user.name}? This action cannot be undone.`)) {
          console.log('Deleting user:', user.id);
          alert(`User ${user.name} has been deleted`);
        }
        break;
    }
  }

  function closeUserDetails() {
    setSelectedUser(null);
    setShowUserDetails(false);
  }

  return (
    <>
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row items-center h-auto md:h-12 justify-center m-2 bg-gray-500 md:justify-end mt-4 gap-3 md:gap-6 px-4 py-2 rounded-md shadow">
        <input
          type="text"
          placeholder="Search users, emails, skills..."
          className="px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300 w-full md:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300 w-full md:w-48"
          value={filterAvailability}
          onChange={(e) => setFilterAvailability(e.target.value)}
        >
          <option value="all">All Availability</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="protected">Protected</option>
        </select>
        <select
          className="px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300 w-full md:w-48"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* User Statistics Summary */}
      <div className="m-2 bg-gray-500 rounded-md p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-gray-600 rounded-lg p-3">
            <div className="text-2xl font-bold text-white">{dummyUsers.length}</div>
            <div className="text-sm text-gray-300">Total Users</div>
          </div>
          <div className="bg-green-600 rounded-lg p-3">
            <div className="text-2xl font-bold text-white">{dummyUsers.filter(u => u.status === 'active').length}</div>
            <div className="text-sm text-gray-300">Active Users</div>
          </div>
          <div className="bg-red-600 rounded-lg p-3">
            <div className="text-2xl font-bold text-white">{dummyUsers.filter(u => u.status === 'suspended').length}</div>
            <div className="text-sm text-gray-300">Suspended</div>
          </div>
          <div className="bg-yellow-600 rounded-lg p-3">
            <div className="text-2xl font-bold text-white">{dummyUsers.filter(u => u.status === 'pending').length}</div>
            <div className="text-sm text-gray-300">Pending</div>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="flex flex-col max-w-[100%] h-full space-y-2 pt-2 bg-gray-500 m-2 rounded-md overflow-y-auto">
        {usersToShow.map((user, i) => {
          const isLast = i === usersToShow.length - 1;
          return (
            <div key={user.id} ref={isLast ? lastCardRef : null}>
              <AdminUserCard
                user={user}
                onAction={handleUserAction}
              />
            </div>
          );
        })}
        {usersToShow.length < filtered.length && (
          <p className="text-center text-white py-4 animate-pulse">Loading more...</p>
        )}
        {filtered.length === 0 && (
          <p className="text-center text-gray-200 py-4">No users match your search criteria.</p>
        )}
      </div>

      {/* User Details Modal */}
      {showUserDetails && selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={closeUserDetails}
          onAction={handleUserAction}
        />
      )}
    </>
  );
}

// User Details Modal Component
  