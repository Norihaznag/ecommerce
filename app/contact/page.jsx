
export const metadata = {
  title: 'Contact Us | Your E-commerce Store',
  description: 'Get in touch with us for any inquiries about our products or services.',
  openGraph: {
    title: 'Contact Us | Your E-commerce Store',
    description: 'Get in touch with us for any inquiries about our products or services.',
    type: 'website',
    url: 'https://your-domain.com/contact',
  },
}


export default function ContactPage() {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="mb-4">Get in touch with us for any inquiries.</p>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">Name</label>
            <input type="text" id="name" className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input type="email" id="email" className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block mb-2">Message</label>
            <textarea id="message" rows="4" className="w-full p-2 border rounded"></textarea>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
        </form>
      </div>
    )
  }