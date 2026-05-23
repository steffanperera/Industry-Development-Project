export function AboutUs() {
  return (
    <div className="bg-gray-50 text-gray-800">

      {/* Hero Section */}
      <div className="bg-green-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">About CareAble</h1>
        <p className="max-w-2xl mx-auto text-lg">
          Connecting families with trusted caregivers through a simple, secure,
          and reliable platform.
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">

        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
          <p className="text-gray-600 leading-relaxed">
            CareAble is a digital platform designed to help individuals and
            families find trusted caregivers easily and confidently. We simplify
            the process of connecting caregivers with those who need care,
            ensuring safety, reliability, and convenience.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-600">Our Mission</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Provide safe and reliable caregiving services</li>
              <li>Empower caregivers with better opportunities</li>
              <li>Help families find trusted care providers</li>
              <li>Improve accessibility using technology</li>
            </ul>
          </div>
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-600">Our Vision</h3>
            <p className="text-gray-600">
              To become a leading caregiving platform that builds trust,
              enhances service quality, and promotes dignity and well-being for
              everyone.
            </p>
          </div>
        </section>

        {/* Services */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-center">What We Offer</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "Elderly Care",
              "Child Care",
              "Special Needs Care",
              "Flexible Booking",
              "Verified Caregivers",
              "Secure Communication",
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                <h4 className="font-semibold text-lg text-green-600">{service}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-green-50 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">Why Choose CareAble?</h2>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <p>✔ Easy-to-use platform</p>
            <p>✔ Verified caregiver profiles</p>
            <p>✔ Secure and reliable connections</p>
            <p>✔ Transparent communication</p>
            <p>✔ Built with modern technologies</p>
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <p className="text-gray-600">
            CareAble is developed by a team of passionate university students
            committed to solving real-world problems using modern technology.
            Our goal is to create meaningful impact through innovation.
          </p>
        </section>
      </div>
    </div>
  );
}
