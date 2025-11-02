"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const router = useRouter();

  return (
    <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
          ✨ Modern Vendor Management Solution
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
          Simplify Your
          <span className="text-blue-600"> Vendor Management</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A complete solution for managing products, inventory, and sales across
          your organization.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push("/login")}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg flex items-center justify-center gap-2"
          >
            Get Started
            <ArrowRight className="h-5 w-5" />
          </button>
          <button
            onClick={() =>
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-4 bg-white text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-medium text-lg border-2 border-gray-200"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
