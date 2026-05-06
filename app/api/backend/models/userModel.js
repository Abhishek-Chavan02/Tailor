import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /.+\@.+\..+/,
  },
  passwordHash: {
    type: String,
    required: true,
    minlength: 6,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    minlength: 10,
    maxlength: 15
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
}, {
  timestamps: true
});


// Prevent OverwriteModelError in Next.js dev/hot-reload.
export const User = mongoose.models.User || mongoose.model("User", userSchema);

export function getAdminUser() {
  return {
    id: "admin",
    name: "Admin",
    email: "admin@example.com",
    role: "admin",
  };
}

