import { Link } from "react-router-dom";

export function CTA() {
  return (
    <section className="py-20 bg-green-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-3xl md:text-4xl mb-6 text-white">
          Ready to Start Your Caregiving Journey?
        </h3>
        <p className="text-lg text-green-100 mb-8">
          Join our community today and start making a difference in people's lives while building
          a rewarding career.
        </p>
        <Link to="/register">
          <button className="px-8 py-4 bg-white text-green-600 rounded-lg hover:bg-gray-50 transition-colors text-lg">
            Register as a Caregiver
          </button>
        </Link>
      </div>
    </section>
  );
}
