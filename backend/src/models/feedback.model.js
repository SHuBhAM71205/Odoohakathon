import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  swapRequest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SwapRequest",
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: [1, "Minimum rating is 1"],
    max: [5, "Maximum rating is 5"]
  },
  comment: {
    type: String,
    maxlength: 500
  }
}, {
  timestamps: true
});

export default mongoose.model("Feedback", feedbackSchema);
