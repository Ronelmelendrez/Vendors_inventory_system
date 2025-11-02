"use client";

import { useRouter } from "next/navigation";

interface DemoAccount {
  role: string;
  email: string;
}

const demoAccounts: DemoAccount[] = [
  { role: "Admin", email: "admin@vendor.com" },
  { role: "Branch", email: "branch@vendor.com" },
];

export function CTACard() {
  const router = useRouter();

  return (
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
          {demoAccounts.map((account, index) => (
            <div key={index} className="bg-blue-600/50 rounded-lg p-3">
              <p className="font-medium">{account.role}</p>
              <p className="text-sm text-blue-100">{account.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
