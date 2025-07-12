import { FaUser } from "react-icons/fa";

export default function Card({
  name,
  profileImage,
  skillsOffered = [],
  skillsWanted = [],
  rating,
  onRequest,
}) {
  // DiceBear avatar fallback
  const avatarUrl = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(
    name || "guest"
  )}`;

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between bg-gray-600 text-white rounded-xl border border-white p-4 shadow-md w-[90%] mx-auto gap-4">
      {/* Avatar + Info */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {profileImage ? (
          <div
            className="w-20 h-20 rounded-full border-2 overflow-clip border-white object-cover">
              <FaUser className="w-full h-full"/>
          </div>
        ) : avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Generated Avatar"
            className="w-20 h-20 rounded-full border-2 border-white object-cover"
          />
        ) : (
          <div className="w-20 h-20 flex items-center justify-center rounded-full border-2 border-white bg-gray-500">
            <FaUser className="text-3xl text-white" />
          </div>
        )}

        {/* Text Info */}
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

      {/* Request Button + Rating */}
      <div className="flex flex-col items-center md:items-end space-y-2">
        <button
          onClick={onRequest}
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
