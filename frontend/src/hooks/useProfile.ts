import { useState, useEffect } from "react";
import { ProfileFormData } from "@/types/user";
import { useAuth } from "@/contexts/AuthContext";

export function useProfile() {
  const { user } = useAuth();

  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    country: "",
    branch_name: user?.branch_name || "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Load profile data from localStorage
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setFormData((prev) => ({
        ...prev,
        ...profile,
        email: user?.email || "",
        branch_name: user?.branch_name || "",
      }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsSaved(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Save to localStorage
      localStorage.setItem("userProfile", JSON.stringify(formData));

      setIsSaved(true);
      alert("Profile updated successfully!");

      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setFormData((prev) => ({
        ...prev,
        ...profile,
        email: user?.email || "",
        branch_name: user?.branch_name || "",
      }));
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: user?.email || "",
        phone: "",
        address: "",
        city: "",
        country: "",
        branch_name: user?.branch_name || "",
      });
    }
    setIsSaved(false);
  };

  return {
    formData,
    isLoading,
    isSaved,
    handleInputChange,
    handleSubmit,
    handleReset,
  };
}
