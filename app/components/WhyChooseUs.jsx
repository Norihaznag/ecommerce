import { Star, TrendingUp, ShoppingCart } from 'lucide-react';

export function WhyChooseUs() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Star className="text-blue-600 w-8 h-8" />}
            title="Quality Products"
            description="We offer only the best, hand-picked items for our customers."
            bgColor="bg-blue-100"
          />
          <FeatureCard
            icon={<TrendingUp className="text-green-600 w-8 h-8" />}
            title="Best Prices"
            description="Enjoy competitive prices and regular discounts on our products."
            bgColor="bg-green-100"
          />
          <FeatureCard
            icon={<ShoppingCart className="text-purple-600 w-8 h-8" />}
            title="Fast Shipping"
            description="Quick and reliable shipping to get your items to you ASAP."
            bgColor="bg-purple-100"
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description, bgColor }) {
  return (
    <div className="text-center">
      <div className={`${bgColor} rounded-full p-4 inline-block mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}