import React, { useState } from 'react';
import { Cake, Calendar, Users, Palette, Send, Sparkles } from 'lucide-react';
import Toast, { useToast } from '../components/Toast';

export default function CustomOrder() {
  const { toast, showToast, hideToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    numberOfServings: '',
    flavor: '',
    designDescription: '',
    specialRequirements: '',
    budget: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      showToast('Custom order request submitted successfully! We will contact you soon.', 'success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        numberOfServings: '',
        flavor: '',
        designDescription: '',
        specialRequirements: '',
        budget: '',
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-300 to-orange-200 rounded-full mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-amber-900 mb-4" style={{ fontFamily: "'Pacifico', cursive" }}>
            Custom Order
          </h1>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Create something extraordinary for your special occasion! Share your vision with us and we'll bring your dream cake to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-amber-900 mb-6">Tell Us About Your Custom Order</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-amber-900 mb-2">
                      Your Name *
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
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-amber-900 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-rose-300"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="eventType" className="block text-sm font-semibold text-amber-900 mb-2">
                      Event Type *
                    </label>
                    <select
                      id="eventType"
                      name="eventType"
                      required
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-rose-300"
                    >
                      <option value="">Select event type</option>
                      <option value="Birthday">Birthday</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Anniversary">Anniversary</option>
                      <option value="Baby Shower">Baby Shower</option>
                      <option value="Graduation">Graduation</option>
                      <option value="Corporate Event">Corporate Event</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="eventDate" className="block text-sm font-semibold text-amber-900 mb-2">
                      Event Date *
                    </label>
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      required
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-rose-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="numberOfServings" className="block text-sm font-semibold text-amber-900 mb-2">
                      Number of Servings *
                    </label>
                    <input
                      type="number"
                      id="numberOfServings"
                      name="numberOfServings"
                      required
                      min="1"
                      value={formData.numberOfServings}
                      onChange={handleChange}
                      placeholder="e.g., 50"
                      className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-rose-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="flavor" className="block text-sm font-semibold text-amber-900 mb-2">
                      Preferred Flavor
                    </label>
                    <select
                      id="flavor"
                      name="flavor"
                      value={formData.flavor}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-rose-300"
                    >
                      <option value="">Select flavor</option>
                      <option value="Vanilla">Vanilla</option>
                      <option value="Chocolate">Chocolate</option>
                      <option value="Strawberry">Strawberry</option>
                      <option value="Red Velvet">Red Velvet</option>
                      <option value="Truffle">Truffle</option>
                      <option value="Mixed">Mixed Flavors</option>
                      <option value="Custom">Custom Flavor</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="designDescription" className="block text-sm font-semibold text-amber-900 mb-2">
                    Design Description *
                  </label>
                  <textarea
                    id="designDescription"
                    name="designDescription"
                    required
                    rows={4}
                    value={formData.designDescription}
                    onChange={handleChange}
                    placeholder="Describe your vision: colors, theme, decorations, any specific design elements..."
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-rose-300"
                  />
                </div>

                <div>
                  <label htmlFor="specialRequirements" className="block text-sm font-semibold text-amber-900 mb-2">
                    Special Requirements
                  </label>
                  <textarea
                    id="specialRequirements"
                    name="specialRequirements"
                    rows={3}
                    value={formData.specialRequirements}
                    onChange={handleChange}
                    placeholder="Dietary restrictions, allergies, special requests..."
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-rose-300"
                  />
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-semibold text-amber-900 mb-2">
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-rose-300"
                  >
                    <option value="">Select budget range</option>
                    <option value="Under ₹5000">Under ₹5,000</option>
                    <option value="₹5000-₹10000">₹5,000 - ₹10,000</option>
                    <option value="₹10000-₹20000">₹10,000 - ₹20,000</option>
                    <option value="₹20000-₹50000">₹20,000 - ₹50,000</option>
                    <option value="Above ₹50000">Above ₹50,000</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-rose-400 to-orange-300 text-white py-4 rounded-full font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Submit Custom Order Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-amber-900 mb-6">Why Choose Custom Orders?</h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-300 to-orange-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-1">Unique Designs</h3>
                    <p className="text-amber-700 text-sm">
                      Every custom order is a one-of-a-kind creation, designed specifically for your special moment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-300 to-orange-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <Cake className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-1">Premium Quality</h3>
                    <p className="text-amber-700 text-sm">
                      Made with the finest ingredients and attention to detail, ensuring your cake is as beautiful as it is delicious.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-300 to-orange-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-1">Planning Made Easy</h3>
                    <p className="text-amber-700 text-sm">
                      We work with you every step of the way to ensure your vision becomes reality.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-300 to-orange-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-1">Perfect for Any Occasion</h3>
                    <p className="text-amber-700 text-sm">
                      From intimate gatherings to grand celebrations, we create cakes that make every event memorable.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-amber-900 mb-4">Important Notes</h3>
              <ul className="space-y-3 text-amber-700 text-sm">
                <li className="flex items-start">
                  <span className="text-rose-400 mr-2">•</span>
                  <span>Please submit custom orders at least <strong>2 weeks in advance</strong> for availability.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-rose-400 mr-2">•</span>
                  <span>Complex designs may require additional time - we'll discuss timeline during consultation.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-rose-400 mr-2">•</span>
                  <span>We'll contact you within 24-48 hours to discuss your order details and pricing.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-rose-400 mr-2">•</span>
                  <span>Feel free to share reference images or inspiration when describing your vision.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}

