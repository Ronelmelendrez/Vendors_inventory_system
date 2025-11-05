export interface User {
  id: string;
  email: string;
  role: "admin" | "branch";
  branch_name?: string;
  profile?: UserProfile;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  profileImage?: string;
}

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  branch_name?: string;
}
