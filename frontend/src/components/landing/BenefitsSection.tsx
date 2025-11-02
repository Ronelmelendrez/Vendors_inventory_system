import { BenefitItem } from "./BenefitItem";
import { CTACard } from "./CTACard";

const benefits = [
  "Real-time inventory tracking",
  "Easy product management",
  "Secure authentication",
  "Role-based access control",
  "Intuitive user interface",
  "Fast checkout process",
];

export function BenefitsSection() {
  return (
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
                <BenefitItem key={index} text={benefit} />
              ))}
            </div>
          </div>

          <CTACard />
        </div>
      </div>
    </section>
  );
}
