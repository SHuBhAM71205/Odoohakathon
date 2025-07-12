// components/RequestCard.jsx
import React from "react";
import { FaUser } from "react-icons/fa";

export default function RequestCard({
  name,
  profileImage,
  skillsOffered = [],
  skillsWanted = [],
  rating,
  status,
  onAccept,
  onReject,
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-gray-600 border border-white rounded-xl p-4 shadow-md  text-white w-full">
      {/* Left: Avatar + Info */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
        <div className="w-20 h-20 flex items-center justify-center rounded-full border-2 border-white overflow-hidden bg-gray-700">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          ) : (
            <FaUser size={40} />
          )}
        </div>

        <div className="text-center sm:text-left w-full">
          <h2 className="text-xl font-semibold">{name}</h2>

          <div className="mt-1">
            <span className="text-green-400">Skills Offered =&gt;</span>
            {skillsOffered.map((skill, i) => (
              <span
                key={i}
                className="inline-block border border-white rounded-full px-3 py-1 text-sm bg-gray-800 ml-2 mt-1"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-1">
            <span className="text-blue-400">Skill Wanted =&gt;</span>
            {skillsWanted.map((skill, i) => (
              <span
                key={i}
                className="inline-block border border-white rounded-full px-3 py-1 text-sm bg-gray-500 ml-2 mt-1"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-2 text-sm text-gray-300">rating {rating}/5</div>
        </div>
      </div>

      {/* Right: Status and Actions */}
      <div className="mt-4 md:mt-0 md:text-right w-full md:w-auto text-center space-y-2">
        <div>
          <span className="text-lg font-semibold">Status </span>
          <span
            className={`text-lg font-bold ${
              status === "Pending"
                ? "text-yellow-400"
                : status === "Accepted"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {status}
          </span>
        </div>
        {status === "Pending" && (
          <div className="flex gap-3 justify-center md:justify-end">
            <button
              onClick={onAccept}
              className="text-green-400 border border-green-400 px-3 py-1 rounded hover:bg-green-600 hover:text-white"
            >
              Accept
            </button>
            <button
              onClick={onReject}
              className="text-red-400 border border-red-400 px-3 py-1 rounded hover:bg-red-600 hover:text-white"
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
}