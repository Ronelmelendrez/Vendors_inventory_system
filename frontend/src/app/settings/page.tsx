"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Header } from "@/components/dashboard";
import { PasswordChangeSection, AccountSettings } from "@/components/settings";
import { User, Mail, Phone, MapPin, Building2, Globe } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useState } from "react";

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  branch_name?: string;
}

function SettingsContent() {
  const { user } = useAuth();
  const {
    formData,
    isLoading,
    isSaved,
    handleInputChange,
    handleSubmit,
    handleReset,
  } = useProfile();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage your profile and account settings
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              Profile Information
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Update your personal details and contact information
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                >
                  <User className="h-4 w-4" />
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter first name"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                >
                  <User className="h-4 w-4" />
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter last name"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="email"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                >
                  <Mail className="h-4 w-4" />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email"
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">
                  Email cannot be changed
                </p>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                >
                  <Phone className="h-4 w-4" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter phone number"
                />
              </div>

              {user?.role === "branch" && (
                <div>
                  <label
                    htmlFor="branch_name"
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                  >
                    <Building2 className="h-4 w-4" />
                    Branch Name
                  </label>
                  <input
                    type="text"
                    id="branch_name"
                    name="branch_name"
                    value={formData.branch_name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Branch name"
                    disabled
                  />
                </div>
              )}

              <div className="md:col-span-2">
                <label
                  htmlFor="address"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                >
                  <MapPin className="h-4 w-4" />
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter street address"
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                >
                  <Building2 className="h-4 w-4" />
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter city"
                />
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                >
                  <Globe className="h-4 w-4" />
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter country"
                />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t flex gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Saving..." : isSaved ? "✓ Saved" : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                disabled={isLoading}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Password Change Section */}
        <PasswordChangeSection />

        {/* Account Settings Section */}
        <AccountSettings />
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "branch"]}>
      <SettingsContent />
    </ProtectedRoute>
  );
}
