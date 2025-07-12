import React ,{useState}from 'react'
import { useAppContext } from "../../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaHome, FaExchangeAlt } from "react-icons/fa";
import NavBar from "../General/NavBar.jsx";
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
      <Profile />
    </div>
  );
}

function Profile() {

    const [showPhotoMenu, setShowPhotoMenu] = useState(false);

    return (
       <div className="flex justify-center items-center flex-1 w-full bg-gray-500 py-6 px-4">
  <div className="w-full max-w-6xl bg-gray-600 text-white rounded-xl shadow-lg p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">

    <div className="order-1 lg:order-2 flex flex-col items-center">
      <div className="relative mb-6">
        <img
          src="https://i.pravatar.cc/150"
          alt="Profile"
          onClick={() => setShowPhotoMenu(!showPhotoMenu)}
          className="w-40 h-40 rounded-full border-4 border-red-300 shadow-lg hover:scale-105 transition cursor-pointer"
        />
        {showPhotoMenu && (
          <div className="absolute top-full mt-2 right-0 bg-gray-700 text-white rounded shadow-md z-10">
            <button className="block w-full px-4 py-2 hover:bg-gray-600">Edit</button>
            <button className="block w-full px-4 py-2 hover:bg-gray-600">Remove</button>
            <button className="block w-full px-4 py-2 hover:bg-gray-600">Add</button>
          </div>
        )}
      </div>

      <div className="w-full space-y-5">
        <div>
          <label className="font-semibold block mb-1">Skills Wanted</label>
          <select
            multiple
            className="w-full px-4 py-2 border border-gray-400 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            <option>Python</option>
            <option>JavaScript</option>
            <option>Manager</option>
          </select>
        </div>
      </div>
    </div>

    <div className="order-2 lg:order-1 space-y-5">
      <div>
        <label className="font-semibold block mb-1">Name</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-400 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-300"
        />
      </div>

      <div>
        <label className="font-semibold block mb-1">Location</label>
        <textarea
          className="w-full px-4 py-2 border border-gray-400 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-300"
        ></textarea>
      </div>

      <div>
        <label className="font-semibold block mb-1">Skills Offered</label>
        <select
          multiple
          className="w-full px-4 py-2 border border-gray-400 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          <option>Graphic Design</option>
          <option>Video Editing</option>
          <option>Photoshop</option>
        </select>
      </div>

      <div>
        <label className="font-semibold block mb-1">Availability</label>
        <select
          className="w-full px-4 py-2 border border-gray-400 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          <option>Weekdays</option>
          <option>Weekends</option>
          <option>Evenings</option>
        </select>
      </div>

      <div>
        <label className="font-semibold block mb-1">Profile</label>
        <select
          className="w-full px-4 py-2 border border-gray-400 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          <option>Public</option>
          <option>Private</option>
        </select>
      </div>
    </div>
  </div>
</div>

    )
}



