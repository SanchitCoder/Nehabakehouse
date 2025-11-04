import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import Toast, { useToast } from '../components/Toast';

export default function Contact() {
  const { toast, showToast, hideToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      showToast('Message sent successfully! We will get back to you soon.', 'success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-amber-900 mb-4" style={{ fontFamily: "'Pacifico', cursive" }}>
            Get in Touch
          </h1>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Have a question or special request? We'd love to hear from you. Reach out and let's make something delicious together!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-amber-900 mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-300 to-orange-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-1">Address</h3>
                    <p className="text-amber-700">
                      123 Bakery Lane<br />
                      Sweet Street, CA 94102<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-300 to-orange-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-1">Phone</h3>
                    <p className="text-amber-700">
                      <a href="tel:+15551234567" className="hover:text-amber-900 transition-colors">
                        (555) 123-4567
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-300 to-orange-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-1">Email</h3>
                    <p className="text-amber-700">
                      <a href="mailto:hello@nehasbakehouse.com" className="hover:text-amber-900 transition-colors">
                        hello@nehasbakehouse.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-300 to-orange-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-1">Hours</h3>
                    <p className="text-amber-700">
                      Monday - Friday: 7am - 7pm<br />
                      Saturday: 8am - 8pm<br />
                      Sunday: 9am - 6pm
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-amber-900 mb-4">Custom Orders</h3>
              <p className="text-amber-700 mb-4">
                Planning a special event? We specialize in custom cakes and desserts for weddings, birthdays, and all of life's sweet moments.
              </p>
              <p className="text-amber-700">
                Contact us at least 2 weeks in advance for custom orders to ensure availability and perfect execution.
              </p>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-amber-900 mb-6">Send us a Message</h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-amber-900 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-rose-300"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-amber-900 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-rose-300"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-amber-900 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-rose-300"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-amber-900 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your inquiry or custom order..."
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-rose-300"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-rose-400 to-orange-300 text-white py-4 rounded-full font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}
