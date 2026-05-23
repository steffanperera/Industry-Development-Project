export function ContactUs() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">

      {/* Hero Section */}
      <div className="bg-green-600 text-white py-14 text-center">
        <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
        <p className="text-lg">We'd love to hear from you</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">

        {/* LEFT - Contact Form */}
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-6 text-green-600">Send a Message</h2>
          <form className="space-y-5">
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Subject</label>
              <input
                type="text"
                placeholder="Enter subject"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Message</label>
              <textarea
                rows={5}
                placeholder="Write your message..."
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* RIGHT - Contact Info + Map */}
        <div className="space-y-6">
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-green-600">Contact Information</h2>
            <p className="mb-2">📧 support@careable.com</p>
            <p className="mb-2">📱 +94 XXX XXX XXX</p>
            <p>📍 Negombo, Sri Lanka</p>
          </div>
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
            <img
              src="https://maps.googleapis.com/maps/api/staticmap?center=Negombo,Sri Lanka&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7CNegombo,Sri Lanka"
              alt="Map"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
