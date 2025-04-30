import { Hero } from '@/components/hero';

export const metadata = {
  title: 'Privacy Policy | Blue Landscaping Services',
  description: 'Our privacy policy outlines how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Hero
        title="Privacy Policy"
        subtitle="Last updated: March 2024"
        image="https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg"
        size="sm"
      />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2>Introduction</h2>
            <p>
              Blue Landscaping Services ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. This privacy policy explains how we collect, use, and safeguard your information when you use our website or services.
            </p>

            <h2>Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul>
              <li>Name and contact information</li>
              <li>Property address and project details</li>
              <li>Communication preferences</li>
              <li>Service history and preferences</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide and improve our services</li>
              <li>Communicate with you about your projects</li>
              <li>Send you important updates and notifications</li>
              <li>Process your payments and maintain records</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>
              We do not sell or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business.
            </p>

            <h2>Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this privacy policy or our practices, please contact us at:
            </p>
            <p>
              Email: privacy@bluelandscaping.com<br />
              Phone: (253) 217-0814<br />
              Address: Seattle, WA
            </p>

            <h2>Updates to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. The updated version will be indicated by an updated "Last updated" date and the updated version will be effective as soon as it is accessible.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}