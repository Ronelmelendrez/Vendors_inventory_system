import { Package, ShoppingCart, BarChart3, Users } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

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

export function FeaturesSection() {
  return (
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
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
