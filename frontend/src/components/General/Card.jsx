import { FaUser } from "react-icons/fa";
import { useState } from "react";

export default function Card({
  name,
  profileImage,
  skillsOffered = [],
  skillsWanted = [],
  rating,
  onRequest,
}) {
  const avatarUrl = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(
    name || "guest"
  )}`;

  const [showPreview, setShowPreview] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = () => setShowPreview(true);
  const handleMouseLeave = () => setShowPreview(false);

  return (
    <div className="relative flex flex-col md:flex-row md:items-center justify-between bg-gray-600 text-white rounded-xl border border-white p-4 shadow-md w-[90%] mx-auto gap-4">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          className="relative cursor-pointer"
        >
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-20 h-20 rounded-full border-2 border-white object-cover"
          />

          {showPreview && (
            <div
              className="absolute z-50 bg-black bg-opacity-60 backdrop-blur-md text-white p-4 rounded-lg w-60 shadow-lg transition-all"
              style={{
                top: mousePos.y - 150,
                left: mousePos.x + 20,
                position: "fixed",
                pointerEvents: "none",
              }}
            >
              <h3 className="text-lg font-bold mb-1">{name}</h3>
              <p className="text-sm">
                <span className="text-green-300 font-semibold">Offers:</span> {skillsOffered.join(", ")}
              </p>
              <p className="text-sm">
                <span className="text-blue-300 font-semibold">Wants:</span> {skillsWanted.join(", ")}
              </p>
              <p className="text-sm mt-1">
                <span className="text-gray-300">Rating:</span> {rating}/5
              </p>

            </div>
          )}
        </div>

        <div className="text-center sm:text-left space-y-2">
          <h2 className="text-xl font-semibold">{name}</h2>

          <div>
            <span className="text-green-400">Skills Offered =&gt;</span>{" "}
            {skillsOffered.map((skill, idx) => (
              <span
                key={idx}
                className="inline-block bg-gray-800 border border-white rounded-full px-3 py-1 text-sm mr-2 mt-1"
              >
                {skill}
              </span>
            ))}
          </div>

          <div>
            <span className="text-blue-400">Skill Wanted =&gt;</span>{" "}
            {skillsWanted.map((skill, idx) => (
              <span
                key={idx}
                className="inline-block bg-gray-800 border border-white rounded-full px-3 py-1 text-sm mr-2 mt-1"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center md:items-end space-y-2">
        <button
          onClick={() => {onRequest({ name,id:idx })}}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-4 py-1 rounded-md shadow-md border-2 border-white w-full sm:w-auto"
        >
          Request
        </button>
        <div className="text-sm">
          <span className="text-gray-300">Rating</span>{" "}
          <span className="font-semibold">{rating}/5</span>
        </div>
      </div>
    </div>
  );
}
