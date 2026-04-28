import bcrypt from "bcryptjs";
import { User } from "../models/userModel";
import { connectDB } from "../db/mongo";

export async function createUser({ name, email, password }) {
  try {
    await connectDB();
    const passwordHash = await bcrypt.hash(password, 10);
    
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
    });

    const savedUser = await user.save();
    
    return {
      ok: true,
      user: {
        id: savedUser._id.toString(),
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
      },
    };
  } catch (e) {
    if (e?.code === 11000) return { ok: false, error: "User already exists" };
    if (e?.name === "ValidationError") {
      const errors = Object.values(e.errors).map(err => err.message);
      return { ok: false, error: errors.join(", ") };
    }
    return { ok: false, error: e?.message ?? "Failed to create user" };
  }
}

export async function findUserByEmail(email) {
  if (!email) return null;
  await connectDB(); 
  const user = await User.findOne({email});
  return user;
}

