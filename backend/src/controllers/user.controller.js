import User from "../models/user.model.js";

export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateMyProfile = async (req, res) => {
  try {
    const updates = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};

export const togglePrivacy = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.isPublic = !user.isPublic;
    await user.save();

    res.status(200).json({ message: `Profile is now ${user.isPublic ? "public" : "private"}` });
  } catch (err) {
    res.status(500).json({ message: "Failed to toggle privacy" });
  }
};

export const updateAvailability = async (req, res) => {
  try {
    const { availability } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.availability = availability;
    await user.save();

    res.status(200).json({ message: "Availability updated", availability: user.availability });
  } catch (err) {
    res.status(500).json({ message: "Failed to update availability" });
  }
};

export const updateSkills = async (req, res) => {
  try {
    const { skillsOffered, skillsWanted } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (skillsOffered) user.skillsOffered = skillsOffered;
    if (skillsWanted) user.skillsWanted = skillsWanted;

    await user.save();

    res.status(200).json({ message: "Skills updated", user });
  } catch (err) {
    res.status(500).json({ message: "Failed to update skills" });
  }
};

export const getPublicUsers = async (req, res) => {
  try {
    const { skill, availability } = req.query;

    let filter = { isPublic: true, isBanned: false };

    if (skill) {
      filter.$or = [
        { skillsOffered: { $regex: skill, $options: "i" } },
        { skillsWanted: { $regex: skill, $options: "i" } },
      ];
    }

    if (availability) {
      filter.availability = availability;
    }

    const users = await User.find(filter).select("-password");

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id, isPublic: true }).select("-password");

    if (!user) return res.status(404).json({ message: "User not found or private" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};
