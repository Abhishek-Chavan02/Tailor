import bcrypt from "bcryptjs";
import { User } from "../models/userModel";
import { connectDB } from "../db/mongo";

export async function createUser({ name, lastName, email, password, phone, role }) {
  try {
    await connectDB();
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Validate required fields
    if (!name || !lastName || !email || !password || !phone) {
      return { ok: false, error: "Missing required fields: name, lastName, email, password, phone" };
    }
    
    const userData = {
      name: name.trim(),
      lastName: lastName.trim(),
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
        lastName: savedUser.lastName,
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

export async function getAllUsers(search = "") {
  await connectDB(); 
  let query ={};
  if(search){
    query={
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ]
    }
  }
  const users = await User.find(query);
  return users;
}


export async function updateUser(id, userData) {
  await connectDB();
  const user = await User.findByIdAndUpdate(id, userData, { new: true });
  return user;
}

export async function deleteUser(id) {
  await connectDB();
  const user = await User.findByIdAndDelete(id);
  return user;
}