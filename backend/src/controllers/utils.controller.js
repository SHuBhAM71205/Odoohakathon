import User from "../models/user.model.js";

const predefinedSkills = [
  "Photoshop",
  "Excel",
  "ReactJS",
  "Node.js",
  "Python",
  "Illustrator",
  "Video Editing",
  "Public Speaking"
];

const availabilityOptions = ["weekends", "weekdays", "evenings", "mornings", "flexible"];

export const getSkills = (req, res) => {
  res.status(200).json(predefinedSkills);
};

export const getAvailabilityOptions = (req, res) => {
  res.status(200).json(availabilityOptions);
};

export const searchUsers = async (req, res) => {
  try {
    const { skill, availability } = req.query;

    let filter = { isPrivate: { $ne: true } };

    if (skill) {
      filter.skillsOffered = { $in: [skill] };
    }

    if (availability) {
      filter.availability = availability;
    }

    const users = await User.find(filter).select("-password");

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Search failed", error: err.message });
  }
};
