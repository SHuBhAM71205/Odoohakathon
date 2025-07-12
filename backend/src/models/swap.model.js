import mongoose from "mongoose";

const swapRequestSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  offeredSkill: {
    type: String,
    required: [true, "Offered skill is required"]
  },
  requestedSkill: {
    type: String,
    required: [true, "Requested skill is required"]
  },
  message: {
    type: String,
    maxlength: 300
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending"
  }
}, {
  timestamps: true
});

export default mongoose.model("SwapRequest", swapRequestSchema);
