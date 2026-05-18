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
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-black text-white py-8 px-6 text-center">
          <h1 className="text-5xl font-serif tracking-[10px] text-yellow-400 uppercase">
            ✂️ Vishal Tailor's ✂️
          </h1>

          <p className="mt-4 text-gray-300 text-lg tracking-wide">
            Premium Tailoring Since 1998
          </p>
        </div>

        {/* About Section */}
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">
            About Us
          </h2>

          <p className="text-gray-700 leading-8 text-lg mb-6">
            Welcome to <span className="font-bold">Vishal Tailor's</span>, where
            style meets perfection. We specialize in premium custom tailoring
            for shirts, pants, suits, and traditional wear with perfect fitting
            and elegant finishing.
          </p>

          <p className="text-gray-700 leading-8 text-lg mb-6">
            Our mission is to provide high-quality stitching with modern fashion
            trends while maintaining classic craftsmanship. Every measurement is
            carefully taken to ensure comfort, confidence, and premium fitting
            for every customer.
          </p>

          <p className="text-gray-700 leading-8 text-lg">
            With years of experience and hundreds of satisfied customers, Vishal
            Tailor's continues to deliver trusted tailoring services with
            dedication and precision.
          </p>
        </div>

        {/* Services */}
        <div className="bg-gray-50 p-8 border-t">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Our Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-xl transition">
              <div className="text-5xl mb-4">👔</div>
              <h3 className="text-xl font-bold mb-2">Shirt Stitching</h3>
              <p className="text-gray-600">
                Perfect fitting formal and casual shirts.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-xl transition">
              <div className="text-5xl mb-4">👖</div>
              <h3 className="text-xl font-bold mb-2">Pant Stitching</h3>
              <p className="text-gray-600">
                Stylish and comfortable pant tailoring.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-xl transition">
              <div className="text-5xl mb-4">✂️</div>
              <h3 className="text-xl font-bold mb-2">Custom Alterations</h3>
              <p className="text-gray-600">
                Alteration and fitting adjustments for all clothes.
              </p>
            </div>
          </div>
        </div>
        {/* Contact Section */}
        <div className="p-8 bg-white border-t">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Us</h2>

          <div className="space-y-4 text-lg">
            <div className="flex items-center gap-4">
              <span className="text-2xl">📞</span>
              <p className="text-gray-700 font-medium">+91 9860923477</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-2xl">📍</span>
              <p className="text-gray-700 font-medium">
                Vishal Tailor's, Hivarkheda Road, Kannad, Maharashtra, India
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-2xl">⏰</span>
              <p className="text-gray-700 font-medium">
                Open: Monday - Saturday | 9:00 AM - 9:00 PM
              </p>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="bg-black text-center text-gray-300 py-4">
          <p>© 2026 Vishal Tailor's | All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}
