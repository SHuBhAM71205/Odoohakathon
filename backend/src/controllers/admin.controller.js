import User from "../models/user.model.js";
import Swap from "../models/swap.model.js";
import Feedback from "../models/feedback.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
};

export const getAllSwaps = async (req, res) => {
  try {
    const swaps = await Swap.find()
      .populate("sender", "username email")
      .populate("receiver", "username email");

    res.status(200).json(swaps);
  } catch (err) {
    res.status(500).json({ message: "Error fetching swaps", error: err.message });
  }
};

export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("from", "username")
      .populate("to", "username");

    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching feedbacks", error: err.message });
  }
};

export const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalSwaps = await Swap.countDocuments();
    const totalFeedbacks = await Feedback.countDocuments();
    const pendingSwaps = await Swap.countDocuments({ status: "pending" });

    res.status(200).json({
      totalUsers,
      totalSwaps,
      pendingSwaps,
      totalFeedbacks
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching stats", error: err.message });
  }
};
