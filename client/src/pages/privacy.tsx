import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import logoPath from "@assets/logo.png";
import { Helmet } from "react-helmet-async";

export default function Privacy() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Privacy Policy | InstantSiteBuilders</title>
        <meta name="description" content="Privacy Policy for InstantSiteBuilders. Learn how we collect, use, and protect your personal information." />
        <link rel="canonical" href="https://instantsitebuilders.com/privacy" />
      </Helmet>
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
              <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect information you provide directly to us, such as:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Name and contact information when you submit our contact form</li>
                <li>Email address for project communication</li>
                <li>Company information for business projects</li>
                <li>Project requirements and preferences</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We automatically collect certain information when you visit our website:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>IP address and browser information</li>
                <li>Pages visited and time spent on site</li>
                <li>Referring website information</li>
                <li>Device and browser characteristics</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Respond to your inquiries and provide customer support</li>
                <li>Deliver web development services</li>
                <li>Send project updates and communications</li>
                <li>Improve our website and services</li>
                <li>Analyze website usage and performance</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Analytics and Tracking</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use analytics services to understand how visitors interact with our website:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Google Analytics:</strong> We use Google Analytics to track website usage and performance</li>
                <li><strong>Vercel Analytics:</strong> We use Vercel Analytics for additional website performance insights</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                These services may use cookies and similar technologies to collect information about your browsing behavior.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights, property, or safety</li>
                <li>With trusted service providers who assist in operating our website (subject to confidentiality agreements)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement appropriate security measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Secure data transmission using SSL encryption</li>
                <li>Regular security updates and monitoring</li>
                <li>Limited access to personal information</li>
                <li>Secure hosting infrastructure</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Email Communications</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you submit our contact form, we send email notifications to our team for prompt response. We use:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Outlook SMTP for reliable email delivery</li>
                <li>Professional email templates for business communications</li>
                <li>Secure email transmission protocols</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                We will only use your email address to respond to your inquiry and provide requested services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our website uses cookies and similar technologies to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Remember your preferences</li>
                <li>Analyze website traffic and usage</li>
                <li>Improve user experience</li>
                <li>Enable certain website functionality</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Your Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Access the personal information we have about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent for data processing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We retain your personal information only as long as necessary to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Provide requested services</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes</li>
                <li>Enforce our agreements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children under 18.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated "Last Updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> support@calerto.app<br />
                  <strong>Response Time:</strong> Within 24 hours<br />
                  <strong>Subject Line:</strong> Privacy Policy Inquiry
                </p>
              </div>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                This privacy policy is effective as of the date stated above and will remain in effect except with respect to any changes in its provisions in the future.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}