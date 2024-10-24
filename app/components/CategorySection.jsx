import Image from 'next/image';
import Link from 'next/link';

export default function CategorySection({ categories }) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Explore Popular Categories</h2>
        <div className="relative">
          <div className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4">
            {categories.map((category, index) => (
              <Link 
                href={category.link} 
                key={index}
                className="flex flex-col items-center min-w-[120px] group "
              >
                <div className="w-24 h-24 border bg-white flex-col text-[#333333] rounded-full flex items-center justify-center mb-2 transition-transform group-hover:scale-105">
                  <Image
                    src='/images/placeholder.png'
                    alt={category.name}
                    className="object-cover w-full h-full"
                    height={96}
                    width={96}
                  />
                </div>
                <span className="text-sm font-medium">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}