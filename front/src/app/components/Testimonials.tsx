import { ImageWithFallback } from './figma/ImageWithFallback';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Senior Caregiver',
    image: 'https://images.unsplash.com/photo-1765896387387-0538bc9f997e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbnVyc2UlMjBjb21wYXNzaW9ufGVufDF8fHx8MTc3NjI1MjA3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    quote: 'CareAble has transformed my career. I love the flexibility and the families I work with are wonderful.'
  },
  {
    name: 'Michael Chen',
    role: 'Home Health Aide',
    image: 'https://images.unsplash.com/photo-1758691461516-7e716e0ca135?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcHJvZmVzc2lvbmFsJTIwc21pbGluZ3xlbnwxfHx8fDE3NzYyNDAzMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    quote: 'The platform makes it easy to find assignments that fit my schedule. Highly recommend for fellow caregivers!'
  }
];

export function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl mb-4 text-gray-900">
            What Our Caregivers Say
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied caregivers who have found meaningful work through CareAble.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-xl relative">
              <Quote className="text-green-200 mb-4" size={40} />
              <p className="text-lg text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center gap-4">
                <ImageWithFallback
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}