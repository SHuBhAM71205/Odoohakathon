import mongoose from "mongoose";

const adminReportSchema = new mongoose.Schema({
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  reportedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  reason: {
    type: String,
    required: [true, "Reason is required"],
    maxlength: 300
  },
  type: {
    type: String,
    enum: ["spam", "inappropriate", "abuse"],
    required: true
  },
  status: {
    type: String,
    enum: ["open", "resolved", "dismissed"],
    default: "open"
  }
}, {
  timestamps: true
});

export default mongoose.model("AdminReport", adminReportSchema);
