import Feedback from "../models/feedback.model.js";

export const leaveFeedback = async (req, res) => {
  try {
    const { toUserId, rating, comment } = req.body;

    const newFeedback = new Feedback({
      from: req.user._id,
      to: toUserId,
      rating,
      comment
    });

    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted", feedback: newFeedback });
  } catch (err) {
    res.status(500).json({ message: "Error submitting feedback", error: err.message });
  }
};

export const getUserFeedback = async (req, res) => {
  try {
    const { userId } = req.params;

    const feedbacks = await Feedback.find({ to: userId })
      .populate("from", "username")
      .sort({ createdAt: -1 });

    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching feedback", error: err.message });
  }
};
