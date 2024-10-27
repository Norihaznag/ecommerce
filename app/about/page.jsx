import Image from 'next/image'

export const metadata = {
  title: 'About Us | Derba Store',
  description: 'Learn about our company history, mission, and commitment to providing quality products and excellent customer service.',
  openGraph: {
    title: 'About Us | Your E-commerce Store',
    description: 'Learn about our company history, mission, and commitment to providing quality products and excellent customer service.',
    images: [
      {
        url: 'https://your-domain.com/images/about-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'About Your E-commerce Store',
      },
    ],
  },
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">About Your E-commerce Store</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="mb-4">
          Founded in [year], Your E-commerce Store began with a simple mission: to provide high-quality products at competitive prices while delivering exceptional customer service. What started as a small online shop has grown into a trusted destination for [your main product categories].
        </p>
        <Image 
          src="/images/store-founder.jpg" 
          alt="Our founder in the first warehouse" 
          width={600} 
          height={400} 
          className="rounded-lg shadow-md"
        />
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="mb-4">
          At Your E-commerce Store, were committed to [your mission statement, e.g.,making quality products accessible to everyone or revolutionizing the way people shop for everyday items]. We believe in [core values, e.g., sustainability, innovation, customer satisfaction].
        </p>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">What Sets Us Apart</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Curated selection of top-quality products</li>
          <li>Exceptional customer service</li>
          <li>Fast and reliable shipping</li>
          <li>[Any unique selling points, e.g., Eco-friendly packaging or 30-day money-back guarantee]</li>
        </ul>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Repeat this block for each team member */}
          <div className="text-center">
            <Image 
              src="/images/team-member-1.jpg" 
              alt="John Doe - CEO" 
              width={200} 
              height={200} 
              className="rounded-full mx-auto mb-2"
            />
            <h3 className="font-semibold">John Doe</h3>
            <p>CEO & Founder</p>
          </div>
          {/* End team member block */}
        </div>
      </section>
    </div>
  )
}