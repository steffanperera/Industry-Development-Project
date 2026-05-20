import { UserPlus, FileCheck, Briefcase, Star } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    number: '01',
    title: 'Create Your Profile',
    description: 'Sign up and complete your caregiver profile with your experience, certifications, and availability.'
  },
  {
    icon: FileCheck,
    number: '02',
    title: 'Get Verified',
    description: 'Complete a simple background check and credential verification process.'
  },
  {
    icon: Briefcase,
    number: '03',
    title: 'Find Opportunities',
    description: 'Browse and apply for care positions that match your skills and schedule.'
  },
  {
    icon: Star,
    number: '04',
    title: 'Start Caring',
    description: 'Begin providing care and build your reputation through positive reviews.'
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl mb-4 text-gray-900">
            How It Works
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Getting started is simple. Follow these four easy steps to begin your caregiving journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <step.icon className="text-white" size={24} />
                </div>
                <div className="text-4xl text-green-100 mb-2">{step.number}</div>
                <h4 className="text-xl mb-2 text-gray-900">{step.title}</h4>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-green-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
