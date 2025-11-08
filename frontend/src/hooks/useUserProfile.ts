import { useState, useEffect, useCallback } from "react";

export interface UserProfileStats {
  totalProducts: number;
  totalSales: number;
  revenue: number;
  growth: number;
  productsChange: number;
  salesChange: number;
  revenueChange: number;
  growthChange: number;
}

export interface UserActivity {
  id: string;
  type: "product" | "sale" | "settings" | "report";
  description: string;
  timestamp: string;
}

export interface UserBadge {
  id: string;
  name: string;
  description: string;
  earned: boolean;
  earnedDate?: string;
}

export function useUserProfile() {
  const [stats, setStats] = useState<UserProfileStats>({
    totalProducts: 0,
    totalSales: 0,
    revenue: 0,
    growth: 0,
    productsChange: 0,
    salesChange: 0,
    revenueChange: 0,
    growthChange: 0,
  });

  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [badges, setBadges] = useState<UserBadge[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadProfileData = useCallback(() => {
    setIsLoading(true);
    try {
      // Load stats from localStorage
      const savedStats = localStorage.getItem("userStats");
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      }

      // Load activities from localStorage
      const savedActivities = localStorage.getItem("userActivities");
      if (savedActivities) {
        setActivities(JSON.parse(savedActivities));
      }

      // Load badges from localStorage
      const savedBadges = localStorage.getItem("userBadges");
      if (savedBadges) {
        setBadges(JSON.parse(savedBadges));
      } else {
        // Initialize default badges
        const defaultBadges: UserBadge[] = [
          {
            id: "1",
            name: "Early Adopter",
            description: "One of the first users",
            earned: true,
            earnedDate: new Date().toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            }),
          },
          {
            id: "2",
            name: "Top Seller",
            description: "Achieved 100+ sales",
            earned: false,
          },
          {
            id: "3",
            name: "Quick Starter",
            description: "Added 10 products in first week",
            earned: true,
            earnedDate: new Date().toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            }),
          },
          {
            id: "4",
            name: "Inventory Master",
            description: "Managed 50+ products",
            earned: false,
          },
          {
            id: "5",
            name: "Customer Favorite",
            description: "Received 5-star ratings",
            earned: false,
          },
          {
            id: "6",
            name: "Achievement Hunter",
            description: "Unlocked all achievements",
            earned: false,
          },
        ];
        setBadges(defaultBadges);
        localStorage.setItem("userBadges", JSON.stringify(defaultBadges));
      }
    } catch (error) {
      console.error("Error loading profile data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateStats = useCallback((newStats: Partial<UserProfileStats>) => {
    setStats((prevStats) => {
      const updatedStats = { ...prevStats, ...newStats };
      localStorage.setItem("userStats", JSON.stringify(updatedStats));
      return updatedStats;
    });
  }, []);

  const addActivity = useCallback((activity: Omit<UserActivity, "id">) => {
    const newActivity: UserActivity = {
      ...activity,
      id: Date.now().toString(),
    };
    setActivities((prevActivities) => {
      const updatedActivities = [newActivity, ...prevActivities].slice(0, 10); // Keep only last 10
      localStorage.setItem("userActivities", JSON.stringify(updatedActivities));
      return updatedActivities;
    });
  }, []);

  const earnBadge = useCallback((badgeId: string) => {
    setBadges((prevBadges) => {
      const updatedBadges = prevBadges.map((badge) =>
        badge.id === badgeId
          ? {
              ...badge,
              earned: true,
              earnedDate: new Date().toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              }),
            }
          : badge
      );
      localStorage.setItem("userBadges", JSON.stringify(updatedBadges));
      return updatedBadges;
    });
  }, []);

  useEffect(() => {
    loadProfileData();
  }, [loadProfileData]);

  return {
    stats,
    activities,
    badges,
    isLoading,
    updateStats,
    addActivity,
    earnBadge,
    refreshProfile: loadProfileData,
  };
}
