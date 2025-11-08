"use client";

import { UserProfile } from "@/components/profile/UserProfile";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { ProfileActivity } from "@/components/profile/ProfileActivity";
import { ProfileBadges } from "@/components/profile/ProfileBadges";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Profile
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                View and manage your profile information
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Profile card */}
          <div className="lg:col-span-1">
            <UserProfile />
          </div>

          {/* Right column - Stats, activity, badges */}
          <div className="lg:col-span-2 space-y-6">
            <ProfileStats />
            <ProfileBadges />
            <ProfileActivity />
          </div>
        </div>
      </div>
    </div>
  );
}
