// LandingPage.jsx
import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/General/NavBar";
import { FaSignInAlt, FaHome, FaExchangeAlt } from "react-icons/fa";
import Card from "../components/General/Card";
import { useAppContext } from "../context/AppContext";
import RequestForm from "../components/General/RequestForm";

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
      <Home2 />
    </div>
  );
}

function Home2() {
  const navigate = useNavigate();
  const { loggedInUser, isLoggedIn } = useAppContext();
  const dummyUsers = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    name: `User ${i + 1}`,
    profileImage: "",
    skillsOffered: ["HTML", "CSS", "React"][i % 3],
    skillsWanted: ["Design", "Python", "UI/UX"][i % 3],
    rating: (Math.random() * 2 + 3).toFixed(1),
    availability: i % 2 === 0 ? "public" : i % 3 === 0 ? "private" : "protected",
  }));

  const [search, setSearch] = useState("");
  const [filterAvailability, setFilterAvailability] = useState("all");
  const [loadIndex, setLoadIndex] = useState(5);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
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
      user.skillsOffered.toLowerCase().includes(search.toLowerCase()) ||
      user.skillsWanted.toLowerCase().includes(search.toLowerCase());
    const matchesAvailability = filterAvailability === "all" || user.availability === filterAvailability;
    return matchesSearch && matchesAvailability;
  });

  const usersToShow = filtered.slice(0, loadIndex);

  function handleRequest(user) {
    if (!isLoggedIn) {
      window.alert("Please login to send a request");
      navigate("/login");
      return;
    }
    setSelectedUser(user);
    setShowForm(true);
  }

  function closeForm() {
    setSelectedUser(null);
    setShowForm(false);
  }

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
          value={filterAvailability}
          onChange={(e) => setFilterAvailability(e.target.value)}
        >
          <option value="all">Availability</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="protected">Protected</option>
        </select>
      </div>

      <div className="flex flex-col max-w-[100%] h-full space-y-2 pt-2 bg-gray-500 m-2 rounded-md overflow-y-auto">
        {usersToShow.map((user, i) => {
          const isLast = i === usersToShow.length - 1;
          return (
            <div key={i} ref={isLast ? lastCardRef : null}>
              <Card
                name={user.name}
                profileImage={user.profileImage}
                skillsOffered={[user.skillsOffered]}
                skillsWanted={[user.skillsWanted]}
                rating={user.rating}
                onRequest={() => handleRequest(user)}
              />
            </div>
          );
        })}
        {usersToShow.length < filtered.length && (
          <p className="text-center text-white py-4 animate-pulse">Loading more...</p>
        )}
        {filtered.length === 0 && (
          <p className="text-center text-gray-200 py-4">No users match the filter.</p>
        )}
      </div>

      {showForm && selectedUser && (
        <RequestForm
          recipient={selectedUser.name}
          offeredSkills={[selectedUser.skillsOffered]}
          wantedSkills={[selectedUser.skillsWanted]}
          onClose={closeForm}
        />
      )}
    </>
  );
}
