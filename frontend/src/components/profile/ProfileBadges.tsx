"use client";

import { Award, Star, Zap, Trophy, Target, Heart } from "lucide-react";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  earned: boolean;
  earnedDate?: string;
  color: string;
}

export function ProfileBadges() {
  const badges: Badge[] = [
    {
      id: "1",
      name: "Early Adopter",
      description: "One of the first users",
      icon: Star,
      earned: true,
      earnedDate: "Jan 2024",
      color: "from-yellow-400 to-orange-500",
    },
    {
      id: "2",
      name: "Top Seller",
      description: "Achieved 100+ sales",
      icon: Trophy,
      earned: false,
      color: "from-purple-400 to-pink-500",
    },
    {
      id: "3",
      name: "Quick Starter",
      description: "Added 10 products in first week",
      icon: Zap,
      earned: true,
      earnedDate: "Jan 2024",
      color: "from-blue-400 to-cyan-500",
    },
    {
      id: "4",
      name: "Inventory Master",
      description: "Managed 50+ products",
      icon: Target,
      earned: false,
      color: "from-green-400 to-emerald-500",
    },
    {
      id: "5",
      name: "Customer Favorite",
      description: "Received 5-star ratings",
      icon: Heart,
      earned: false,
      color: "from-red-400 to-rose-500",
    },
    {
      id: "6",
      name: "Achievement Hunter",
      description: "Unlocked all achievements",
      icon: Award,
      earned: false,
      color: "from-indigo-400 to-purple-500",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Achievements
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`relative group ${
              badge.earned ? "opacity-100" : "opacity-40"
            }`}
          >
            <div
              className={`w-full aspect-square rounded-lg bg-gradient-to-br ${
                badge.color
              } p-0.5 ${
                badge.earned
                  ? "shadow-lg"
                  : "grayscale hover:grayscale-0 transition-all"
              }`}
            >
              <div className="w-full h-full bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <badge.icon className="h-8 w-8 text-gray-700 dark:text-gray-300" />
              </div>
            </div>
            <div className="mt-2 text-center">
              <p className="text-xs font-medium text-gray-900 dark:text-gray-100 line-clamp-1">
                {badge.name}
              </p>
              {badge.earned && badge.earnedDate && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {badge.earnedDate}
                </p>
              )}
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
              {badge.description}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
