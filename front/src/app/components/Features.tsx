import { Heart, Shield, DollarSign, Clock, Users, Award } from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: 'Make a Difference',
    description: 'Provide compassionate care and improve the quality of life for those who need it most.'
  },
  {
    icon: DollarSign,
    title: 'Competitive Pay',
    description: 'Earn competitive rates with flexible scheduling options that fit your lifestyle.'
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'All families are verified and vetted to ensure your safety and peace of mind.'
  },
  {
    icon: Clock,
    title: 'Flexible Hours',
    description: 'Choose assignments that match your availability and preferred working hours.'
  },
  {
    icon: Users,
    title: 'Supportive Community',
    description: 'Join a network of caring professionals and access ongoing support and resources.'
  },
  {
    icon: Award,
    title: 'Professional Growth',
    description: 'Access training opportunities and career development programs.'
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl mb-4 text-gray-900">
            Why Choose CareAble?
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're dedicated to supporting caregivers with the tools and opportunities
            they need to succeed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="text-green-600" size={24} />
              </div>
              <h4 className="text-xl mb-2 text-gray-900">{feature.title}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
