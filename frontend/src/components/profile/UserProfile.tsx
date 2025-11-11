"use client";

import { User, Mail, MapPin, Phone, Building2, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

interface UserProfileData {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  joinedDate: string;
}

export function UserProfile() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<UserProfileData>({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    joinedDate: new Date().toLocaleDateString(),
  });

  useEffect(() => {
    // Load profile data from localStorage
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setProfileData(profile);
    }
  }, []);

  const getInitials = () => {
    if (profileData.firstName && profileData.lastName) {
      return `${profileData.firstName[0]}${profileData.lastName[0]}`.toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || "U";
  };

  const getFullName = () => {
    if (profileData.firstName || profileData.lastName) {
      return `${profileData.firstName} ${profileData.lastName}`.trim();
    }
    return "User";
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 overflow-hidden">
      {/* Header with gradient background */}
      <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

      {/* Profile content */}
      <div className="px-6 pb-6">
        {/* Avatar */}
        <div className="flex items-start -mt-16 mb-4">
          <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl">
            <span className="text-4xl font-bold text-white">
              {getInitials()}
            </span>
          </div>
        </div>

        {/* User info */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {getFullName()}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 capitalize mt-1">
            {user?.role || "User"}{" "}
            {user?.branch_name && `• ${user.branch_name}`}
          </p>
        </div>

        {/* Contact details */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            <span className="text-sm">{user?.email || "No email"}</span>
          </div>

          {profileData.phone && (
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Phone className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              <span className="text-sm">{profileData.phone}</span>
            </div>
          )}

          {(profileData.address || profileData.city || profileData.country) && (
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <MapPin className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              <span className="text-sm">
                {[profileData.address, profileData.city, profileData.country]
                  .filter(Boolean)
                  .join(", ") || "No address"}
              </span>
            </div>
          )}

          {user?.branch_name && (
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Building2 className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              <span className="text-sm">{user.branch_name}</span>
            </div>
          )}

          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <Calendar className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            <span className="text-sm">Joined {profileData.joinedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
