import HeroSlider from './components/HeroSlider';
import CategorySection from "./components/CategorySection"
import FeaturedProducts from './components/FeaturedProducts';
import { Suspense } from 'react';

// Hero slides data
const heroSlides = [
  {
    id: 1,
    title: "Discover a kaleidoscope of cards",
    description: "Build your collection of trading cards and collectible card games.",
    bgColor: "#FFB800",
    image: "/cards-collage-1.jpg",
    buttonText: "Find your favorites"
  },
  {
    id: 2,
    title: "Rare Pokemon Cards Collection",
    description: "Explore our extensive collection of rare and vintage Pokemon cards.",
    bgColor: "#FF4D4D",
    image: "/cards-collage-2.jpg",
    buttonText: "Shop Pokemon"
  },
  {
    id: 3,
    title: "Sports Trading Cards",
    description: "Get your hands on exclusive sports memorabilia and trading cards.",
    bgColor: "#4CAF50",
    image: "/cards-collage-3.jpg",
    buttonText: "Explore Sports Cards"
  }
];

// Categories data
const categories = [
  { name: 'Luxury', icon: '/images/placeholder.png', link: '/category/luxury' },
  { name: 'Sneakers', icon: '/images/sneakers.png', link: '/category/sneakers' },
  { name: 'P&A', icon: '/images/parts.png', link: '/category/parts-accessories' },
  { name: 'Refurbished', icon: '/images/refurbished.png', link: '/category/refurbished' },
  { name: 'Trading cards', icon: '/images/cards.png', link: '/category/trading-cards' },
  { name: 'Pre-loved Luxury', icon: '/images/pre-loved.png', link: '/category/pre-loved' },
  { name: 'Toys', icon: '/images/toys.png', link: '/category/toys' },
];



const Loading = () => {
  return (
    <div className='min-h-screen w-screen flex justify-center items-center bg-black text-white'>
      <h1>loading...</h1>
    </div>
  )
}


export default async function Home() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<Loading />}>
        <HeroSlider slides={heroSlides} />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <CategorySection categories={categories} />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <FeaturedProducts />
      </Suspense>
    </main>
  );
}