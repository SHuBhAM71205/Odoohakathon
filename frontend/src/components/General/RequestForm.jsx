import React, { useState } from "react";

export default function RequestForm({ recipient, onClose, onSubmit }) {
  const [offered, setOffered] = useState("");
  const [wanted, setWanted] = useState("");
  const [message, setMessage] = useState("");
  const [customOffered, setCustomOffered] = useState("");
  const [customWanted, setCustomWanted] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample skills - you can replace this with data from your app context or API
  const availableSkills = [
    "HTML", "CSS", "JavaScript", "React", "Vue", "Angular", "Node.js", "Python", 
    "Java", "C++", "PHP", "Ruby", "Go", "Swift", "Kotlin", "Flutter", "React Native",
    "UI/UX Design", "Graphic Design", "Digital Marketing", "SEO", "Content Writing",
    "Data Analysis", "Machine Learning", "DevOps", "Cloud Computing", "Cybersecurity",
    "Project Management", "Photography", "Video Editing", "Music Production", "3D Modeling"
  ];

  const handleSubmit = async () => {
    const finalOffered = offered === "custom" ? customOffered : offered;
    const finalWanted = wanted === "custom" ? customWanted : wanted;

    if (!finalOffered || !finalWanted) {
      alert("Please select or enter both skills");
      return;
    }

    if (finalOffered.trim() === "" || finalWanted.trim() === "") {
      alert("Please provide valid skill names");
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit({
        offered: finalOffered,
        wanted: finalWanted,
        message: message.trim(),
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Failed to send request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-800 text-white p-6 rounded-lg w-full max-w-md relative shadow-2xl">
        <button 
          className="absolute top-2 right-3 text-2xl hover:text-red-400 transition-colors" 
          onClick={onClose}
          disabled={isSubmitting}
        >
          &times;
        </button>
        
        <h2 className="text-xl mb-6 font-semibold">
          Send Request to <span className="text-cyan-400">{recipient.name}</span>
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">What skill will you offer?</label>
            <select 
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-cyan-400 focus:outline-none" 
              value={offered} 
              onChange={(e) => setOffered(e.target.value)}
              disabled={isSubmitting}
            >
              <option value="">-- Select a skill --</option>
              {availableSkills.map((skill, i) => (
                <option key={i} value={skill}>{skill}</option>
              ))}
              <option value="custom">Other (specify below)</option>
            </select>
            
            {offered === "custom" && (
              <input
                type="text"
                placeholder="Enter your skill"
                className="w-full p-2 mt-2 bg-gray-700 rounded border border-gray-600 focus:border-cyan-400 focus:outline-none"
                value={customOffered}
                onChange={(e) => setCustomOffered(e.target.value)}
                disabled={isSubmitting}
              />
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">What skill do you want to learn?</label>
            <select 
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-cyan-400 focus:outline-none" 
              value={wanted} 
              onChange={(e) => setWanted(e.target.value)}
              disabled={isSubmitting}
            >
              <option value="">-- Select a skill --</option>
              {availableSkills.map((skill, i) => (
                <option key={i} value={skill}>{skill}</option>
              ))}
              <option value="custom">Other (specify below)</option>
            </select>
            
            {wanted === "custom" && (
              <input
                type="text"
                placeholder="Enter desired skill"
                className="w-full p-2 mt-2 bg-gray-700 rounded border border-gray-600 focus:border-cyan-400 focus:outline-none"
                value={customWanted}
                onChange={(e) => setCustomWanted(e.target.value)}
                disabled={isSubmitting}
              />
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Message (optional)</label>
            <textarea 
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-cyan-400 focus:outline-none resize-none" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              rows="4"
              placeholder="Tell them why you'd like to skill swap..."
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button 
            onClick={onClose} 
            className="flex-1 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            className="flex-1 bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Request"}
          </button>
        </div>
      </div>
    </div>
  );
}