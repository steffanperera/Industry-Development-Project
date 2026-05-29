import { Building2 } from 'lucide-react';

const partners = [
  {
    img:'./carelogo1.png',
    name: 'La Trobe University',
    category: 'Education Partner',
  },
  {
    img:'./care-logo2.jpg',
    name: 'HealthCare Plus',
    category: 'Healthcare Provider',
  },
  {
    img:'./care-logo3.png',
    name: 'Wellness Support Network',
    category: 'Community Partner',
  },
  {
    img:'./care-logo4.jpeg',
    name: 'CareFirst Australia',
    category: 'Care Services',
  },
  {
    img:'./care-logo5.png',
    name: 'Bright Future Foundation',
    category: 'Non-Profit Organisation',
  },
  {
    img:'./care-logo6.png',
    name: 'MedAssist Group',
    category: 'Medical Services',
  },
  {
    img:'./care-logo7.jpeg',
    name: 'Golden Age Support',
    category: 'Senior Care Partner',
  },
];

export function Partners() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl text-gray-900 mb-4">
            Our Trusted Partners
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We proudly collaborate with leading universities, healthcare
            providers, and community organisations to support caregivers and families.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition duration-300 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <img src={partner.img} alt="img" />
                
              </div>
            
              <h4 className="text-lg text-gray-900 mb-2">
                {partner.name}
              </h4>

              <p className="text-sm text-gray-600">
                {partner.category}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}