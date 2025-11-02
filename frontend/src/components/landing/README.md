# Landing Page Components

Reusable components for the landing page.

## Components

### Navigation

- **File**: `Navigation.tsx`
- **Purpose**: Top navigation bar with logo and Sign In button
- **Usage**: `<Navigation />`

### HeroSection

- **File**: `HeroSection.tsx`
- **Purpose**: Main hero section with headline, description, and CTA buttons
- **Usage**: `<HeroSection />`
- **Features**: Badge, animated buttons, smooth scrolling

### FeaturesSection

- **File**: `FeaturesSection.tsx`
- **Purpose**: Display product features in a grid
- **Usage**: `<FeaturesSection />`
- **Includes**: FeatureCard components

### FeatureCard

- **File**: `FeatureCard.tsx`
- **Purpose**: Individual feature card with icon, title, and description
- **Props**:
  - `icon: LucideIcon` - Icon component from lucide-react
  - `title: string` - Feature title
  - `description: string` - Feature description
- **Usage**: `<FeatureCard icon={Package} title="..." description="..." />`

### BenefitsSection

- **File**: `BenefitsSection.tsx`
- **Purpose**: Display benefits and CTA card
- **Usage**: `<BenefitsSection />`
- **Includes**: BenefitItem and CTACard components

### BenefitItem

- **File**: `BenefitItem.tsx`
- **Purpose**: Individual benefit item with checkmark
- **Props**:
  - `text: string` - Benefit text
- **Usage**: `<BenefitItem text="Real-time inventory tracking" />`

### CTACard

- **File**: `CTACard.tsx`
- **Purpose**: Call-to-action card with demo accounts
- **Usage**: `<CTACard />`
- **Features**: Demo account display, Sign In button

### Footer

- **File**: `Footer.tsx`
- **Purpose**: Footer with branding and copyright
- **Usage**: `<Footer />`

## Example Usage

```tsx
import {
  Navigation,
  HeroSection,
  FeaturesSection,
  BenefitsSection,
  Footer,
} from "@/components/landing";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <Footer />
    </div>
  );
}
```

## Customization

Each component can be easily customized:

1. **Data**: Modify arrays in components (features, benefits, demo accounts)
2. **Styling**: Update Tailwind classes
3. **Behavior**: Add props for dynamic content
4. **Layout**: Rearrange sections as needed

## Benefits of This Structure

✅ **Reusable** - Components can be used in other pages
✅ **Maintainable** - Easy to update individual sections
✅ **Testable** - Each component can be tested independently
✅ **Scalable** - Add new features without affecting others
✅ **Type-Safe** - TypeScript interfaces for props
