import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import logoPath from "@assets/logo.png";

export default function Terms() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={logoPath}
                alt="InstantSiteBuilders Logo"
                className="h-12 w-auto mr-4"
              />
              <h1 className="text-2xl font-bold text-gray-900">Terms of Use</h1>
            </div>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-8">
              <strong>Last Updated:</strong> August 2, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing and using InstantSiteBuilders' website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Services Provided</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                InstantSiteBuilders provides web development and design services including:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Free basic website development</li>
                <li>Custom website design and development</li>
                <li>Mobile-responsive web applications</li>
                <li>SEO optimization services</li>
                <li>Website maintenance and support</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Free Service Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our free basic website service includes:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Up to 5 pages of content</li>
                <li>Mobile-responsive design</li>
                <li>Basic contact form functionality</li>
                <li>Standard SEO optimization</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                Free services are provided "as-is" without warranty. We reserve the right to modify or discontinue free services at any time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Responsibilities</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Users are responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Providing accurate and complete information</li>
                <li>Maintaining the confidentiality of account information</li>
                <li>Ensuring content provided is legal and does not infringe on third-party rights</li>
                <li>Complying with all applicable laws and regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                All content, designs, and code created by InstantSiteBuilders remain our intellectual property until final payment is received. Upon full payment, clients receive full ownership rights to their custom website.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                For free services, clients receive a perpetual license to use the delivered website, but InstantSiteBuilders retains the right to showcase the work in our portfolio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Payment Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                For paid services:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Payment is required before project commencement</li>
                <li>All prices are in USD</li>
                <li>Hosting fees are additional and billed separately</li>
                <li>Refunds are available within 7 days of project completion if deliverables don't meet agreed specifications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                InstantSiteBuilders shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Termination</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Either party may terminate this agreement at any time with written notice. Upon termination, all rights and obligations cease, except for payment obligations already incurred.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of our services constitutes acceptance of modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                For questions about these Terms of Use, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> support@calerto.app<br />
                  <strong>Response Time:</strong> Within 24 hours
                </p>
              </div>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                These terms constitute the entire agreement between you and InstantSiteBuilders regarding the use of our services.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}