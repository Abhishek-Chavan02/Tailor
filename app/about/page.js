"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { isLoggedIn } from "../utils/auth";

export default function About() {
  const router = useRouter();
  const [canRender, setCanRender] = useState(false);

  useLayoutEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/login");
      return;
    }
    setCanRender(true);
  }, [router]);

  if (!canRender) return null;

  return (
    <div className="p-4">
        <p>This is the About page.</p>
    </div>
  );
}

