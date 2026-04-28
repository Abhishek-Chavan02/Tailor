"use client";

import { useAppSelector } from "../redux/hooks";

export default function Home(){
    const { userInfo } = useAppSelector((s) => s.userLogin);
 

    return(<>
    <h1>Home</h1>
    <div className="mt-4">
      <p>Email: {userInfo.email}</p>
      <p>Password: {userInfo.password}</p>
    </div>
    </>)
}