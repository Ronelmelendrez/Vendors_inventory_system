"use client";

import { useRouter } from "next/navigation";
import {
  Package,
  ShoppingCart,
  BarChart3,
  Users,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function LandingPage() {
  const router = useRouter();

  const features = [
    {
      icon: Package,
      title: "Product Management",
      description:
        "Easily manage your product inventory with real-time updates and tracking.",
    },
    {
      icon: ShoppingCart,
      title: "Point of Sale",
      description: "Fast and efficient checkout system for branch operations.",
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description:
        "Comprehensive insights into your sales and inventory performance.",
    },
    {
      icon: Users,
      title: "Multi-User Access",
      description: "Role-based access for admins and branch users.",
    },
  ];

  const benefits = [
    "Real-time inventory tracking",
    "Easy product management",
    "Secure authentication",
    "Role-based access control",
    "Intuitive user interface",
    "Fast checkout process",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Package className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                Vendor Management
              </span>
            </div>
            <button
              onClick={() => router.push("/login")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
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
            A complete solution for managing products, inventory, and sales
            across your organization.
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

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to manage your vendor operations efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-xl border-2 border-gray-100 hover:border-blue-500 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose Our System?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Built with modern technology and best practices to ensure your
                business runs smoothly and efficiently.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 shrink-0" />
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-6">Ready to get started?</h3>
              <p className="text-blue-100 mb-8 text-lg">
                Join us today and streamline your vendor management operations.
              </p>
              <button
                onClick={() => router.push("/login")}
                className="w-full px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg"
              >
                Sign In Now
              </button>
              <div className="mt-8 pt-8 border-t border-blue-400">
                <p className="text-sm text-blue-100 mb-4">Demo Accounts:</p>
                <div className="space-y-3">
                  <div className="bg-blue-600/50 rounded-lg p-3">
                    <p className="font-medium">Admin</p>
                    <p className="text-sm text-blue-100">admin@vendor.com</p>
                  </div>
                  <div className="bg-blue-600/50 rounded-lg p-3">
                    <p className="font-medium">Branch</p>
                    <p className="text-sm text-blue-100">branch@vendor.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Package className="h-6 w-6 text-blue-400" />
            <span className="text-lg font-semibold">
              Vendor Management System
            </span>
          </div>
          <p className="text-gray-400">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
