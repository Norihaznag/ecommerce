"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Cart from "./Cart";
import { Home, NotepadTextIcon, Package, Users } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  const AdminNav = () => (
    <ul className="space-y-2 md:flex md:space-y-0 gap-4 text-[#e0e0e0] ">
      <li>
        <Link
          href="/admin"
          className="flex items-center space-x-2  rounded hover:text-white max-sm:py-2 "
        >
          <Home size={20} />
          <span>Dashboard</span>
        </Link>
      </li>

      <li>
        <Link
          href="/admin/products"
          className="flex items-center space-x-2  rounded hover:text-white max-sm:py-2 "
        >
          <Package size={20} />
          <span>Products</span>
        </Link>
      </li>

      <li>
        <Link
          href="/admin/orders"
          className="flex items-center space-x-2  rounded hover:text-white max-sm:py-2 "
        >
          <NotepadTextIcon size={20} />
          <span>Orders</span>
        </Link>
      </li>
    
      <li>
        <Link
          href="/admin/users"
          className="flex items-center space-x-2  rounded hover:text-white max-sm:py-2 "
        >
          <Users size={20} />
          <span>users</span>
        </Link>
      </li>
    </ul>
  );

  const ClientNav = () => (
    <ul className="md:flex md:space-x-4">
      <li>
        <Link href="/" className="hover:text-gray-300">
          Home
        </Link>
      </li>
      <li>
        <Link href="/products" className="hover:text-gray-300">
          Products
        </Link>
      </li>
      <li>
        <Link href="/categories" className="hover:text-gray-300">
          Categories
        </Link>
      </li>
      <li>
        <Link href="/about" className="hover:text-gray-300">
          About
        </Link>
      </li>
      <li>
        <Link href="/contact" className="hover:text-gray-300">
          Contact
        </Link>
      </li>
      {!isAdminPage && (
        <li>
          <Cart />
        </li>
      )}
    </ul>
  );

  return (
    <header
      className={`${
        isAdminPage ? "bg-[#5a1a5a]" : "bg-[#1A3A5A]"
      } text-white Navigation`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Derba
          </Link>

          <div className="flex items-center md:hidden">
            {!isAdminPage && <Cart />}
            <button className="ml-4" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <div className="max-sm:hidden md:block">
            {isAdminPage ? <AdminNav /> : <ClientNav />}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            {isAdminPage ? <AdminNav /> : <ClientNav />}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
