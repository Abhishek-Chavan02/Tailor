import bcrypt from "bcryptjs";
import User from "../models/userModel";
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

const userListProjection = { passwordHash: 0 };

export async function getAllUsers(search = "", pagination = null) {
  await connectDB();
  let query = {};
  if (search) {
    query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ],
    };
  }

  const hasPaging =
    pagination &&
    pagination.page != null &&
    pagination.limit != null;

  if (hasPaging) {
    const page = Math.max(1, parseInt(String(pagination.page), 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(String(pagination.limit), 10) || 10));
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      User.find(query)
        .select(userListProjection)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      User.countDocuments(query),
    ]);
    return {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: total === 0 ? 0 : Math.ceil(total / limit),
      },
    };
  }

  const users = await User.find(query)
    .select(userListProjection)
    .sort({ createdAt: -1 })
    .lean();
  return {
    users,
    pagination: {
      page: 1,
      limit: users.length,
      total: users.length,
      totalPages: users.length ? 1 : 0,
    },
  };
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