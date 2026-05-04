import bcrypt from "bcryptjs";
import { User } from "../models/userModel";
import { connectDB } from "../db/mongo";

export async function createUser({ name, email, password, phone, role }) {
  try {
    await connectDB();
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Validate required fields
    if (!name || !email || !password || !phone) {
      return { ok: false, error: "Missing required fields: name, email, password, phone" };
    }
    
    const userData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      phone: phone.trim(),
      role: (role || 'user').trim(),
    };
    
        
    const user = new User(userData);

    const savedUser = await user.save();
    
    return {
      ok: true,
      user: {
        id: savedUser._id.toString(),
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
        phone: savedUser.phone,
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

