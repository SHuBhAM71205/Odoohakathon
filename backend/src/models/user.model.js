import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Email is invalid"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6
  },
  location: {
    type: String,
    trim: true
  },
  profilePhoto: {
    type: String,
  },
  skillsOffered: {
    type: [String],
    default: []
  },
  skillsWanted: {
    type: [String],
    default: []
  },
  availability: {
    type: [String],
    enum: ['weekends', 'weekdays', 'evenings', 'mornings', 'anytime'],
    default: ['anytime']
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  isBanned: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }
}, {
  timestamps: true
});

export default mongoose.model("User", userSchema);
