import { CheckCircle } from "lucide-react";

interface BenefitItemProps {
  text: string;
}

export function BenefitItem({ text }: BenefitItemProps) {
  return (
    <div className="flex items-center gap-3">
      <CheckCircle className="h-6 w-6 text-green-500 shrink-0" />
      <span className="text-gray-700 text-lg">{text}</span>
    </div>
  );
}
