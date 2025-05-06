import { ProfessionalServices } from '@/components/professional-services';
import { LandscapingPortfolioSection } from '@/components/landscaping-portfolio-section';

export const metadata = {
  title: 'Portfolio | Blue Landscaping Services',
  description: 'View our portfolio of completed landscaping and hardscaping projects in Seattle. Browse through our gallery of custom patios, water features, retaining walls, and more.',
};

export default function PortfolioPage() {
  return (
    <>
      {/* Expert Landscaping & Hardscaping Solutions Section */}
      <ProfessionalServices />

      {/* Landscaping Portfolio Section */}
      <LandscapingPortfolioSection />
    </>
  );
}