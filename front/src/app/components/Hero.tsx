import { ImageWithFallback } from './figma/ImageWithFallback';
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-900">
              Join Our Network of Trusted Caregivers
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Make a meaningful difference in people's lives. Register today to connect with families 
              who need compassionate, professional care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
          to="/register">
              <button className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                
                Get Started
              </button>
              </Link>
              <a href="#features">
              <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors">
                Learn More
              </button>
              </a>
            </div>
          </div>
          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1765896387398-1e1ae8d2eb85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjYXJlZ2l2ZXIlMjBlbGRlcmx5JTIwY2FyZXxlbnwxfHx8fDE3NzYyNTIwNzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Professional caregiver with elderly patient"
              className="rounded-2xl shadow-2xl w-full object-cover h-[400px] md:h-[500px]"
            />
          </div>
        </div>
      </div>
      
    </section>
  );
}