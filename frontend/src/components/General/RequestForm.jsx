import React, { useState } from "react";

export default function RequestForm({ targetUser, offeredSkills, onClose, onSubmit }) {
  const [offered, setOffered] = useState("");
  const [wanted, setWanted] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!offered || !wanted) return alert("Please select both skills");
    onSubmit({ offered, wanted, message });
  };

  return (
    <div className="fixed inset-0 bg-gray-100/55 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-white p-6 rounded-lg w-full max-w-md relative">
        <button className="absolute top-2 right-3 text-xl" onClick={onClose}>&times;</button>
        <h2 className="text-xl mb-4 font-semibold">Send Request to {targetUser?.name}</h2>

        <label className="block mb-2">Your Offered Skill</label>
        <select className="w-full p-2 mb-4 bg-gray-700 rounded" value={offered} onChange={(e) => setOffered(e.target.value)}>
          <option value="">-- select --</option>
          {offeredSkills.map((skill, i) => <option key={i} value={skill}>{skill}</option>)}
        </select>

        <label className="block mb-2">Their Wanted Skill</label>
        <select className="w-full p-2 mb-4 bg-gray-700 rounded" value={wanted} onChange={(e) => setWanted(e.target.value)}>
          <option value="">-- select --</option>
          <option value={targetUser?.skillsWanted}>{targetUser?.skillsWanted}</option>
        </select>

        <label className="block mb-2">Message</label>
        <textarea className="w-full p-2 mb-4 bg-gray-700 rounded" value={message} onChange={(e) => setMessage(e.target.value)} rows="4" />

        <button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Submit</button>
      </div>
    </div>
  );
}
