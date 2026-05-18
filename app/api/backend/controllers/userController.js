import { NextResponse } from "next/server";
import { createUser, deleteUser, findUserByEmail, getAllUsers, updateUser } from "../services/userService";

export async function createUserController(data) {
  let body;
  if (typeof data === 'object' && !data.json) {
    body = data;
  } else {
    try {
      body = await data.json();
    } catch {
      return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
    }
  }

  const name = typeof body?.name === "string" ? body.name : "";
  const lastName = typeof body?.lastName === "string" ? body.lastName : "";
  const email = typeof body?.email === "string" ? body.email : "";
  const password = typeof body?.password === "string" ? body.password : "";
  const phone = typeof body?.phone === "string" ? body.phone : "";
  const role = typeof body?.role === "string" ? body.role : "user";

  const result = await createUser({ name, lastName, email, password, phone, role });
  
  if (!result.ok) {
    return NextResponse.json({ message: result.error ?? "Failed" }, { status: 400 });
  }

  return NextResponse.json({ user: result.user }, { status: 201 });
}


export async function findUserByEmailController(request) {
  let email;
  
  if (request.body) {
    const body = await request.json();
    email = body.email;
  } else if (request.email) {
    email = request.email;
  }
  
  if (!email) {
    return NextResponse.json({ message: "Email parameter is required" }, { status: 400 });
  }
  
  const user = await findUserByEmail(email);
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  
  return NextResponse.json({ user }, { status: 200 });
}


export async function getAllUsersController(data) {
  try {
    const search = data?.search || "";
    const { page, limit } = data || {};
    const pagination =
      page != null && limit != null ? { page, limit } : null;

    const result = await getAllUsers(search, pagination);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function updateUserController(data) {
  try {
    const { id, userData } = data;
    const user = await updateUser(id, userData);
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function deleteUserController(data) {
  try {
    const { id } = data;
    const user = await deleteUser(id);
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

