"use client";

import { Card } from "@/components/ui/card";

export default function TermsOfService() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="space-y-8">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700">
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">2. Services</h2>
          <p className="text-gray-700">
            We provide landscaping and hardscaping services. The specific scope of work will be detailed in individual service agreements or quotes provided to clients.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">3. Pricing and Payment</h2>
          <p className="text-gray-700">
            Prices for our services are as quoted on a project-by-project basis. Payment terms will be specified in the service agreement or quote. We accept the following payment methods:
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-700">
            <li>Zelle</li>
            <li>Venmo</li>
            <li>PayPal</li>
            <li>Cash</li>
            <li>Visa</li>
            <li>Mastercard</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">4. Cancellation Policy</h2>
          <p className="text-gray-700">
            Cancellation policies vary by service type and will be detailed in your service agreement. Please contact us directly for specific cancellation terms.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">5. Liability</h2>
          <p className="text-gray-700">
            While we strive to provide the highest quality service, we are not liable for damages beyond our control. All services are provided "as is" without warranty of any kind.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">6. Privacy Policy</h2>
          <p className="text-gray-700">
            Your use of our services is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
          <p className="text-gray-700">
            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website.
          </p>
        </Card>

        <div className="mt-8 text-sm text-gray-500">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}