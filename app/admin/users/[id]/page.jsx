import React from 'react';
import { 
  User2 as UserIcon, 
  MapPin, 
  CreditCard, 
  Package, 
  ShoppingCart, 
  Heart 
} from 'lucide-react';
import Image from 'next/image';


export default function UserProfilePage() {
  // Mock user data - in a real app, this would come from an API or state management
  const user = {
    id: 'user123',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatarUrl: '/placeholder-avatar.jpg',
    addresses: [
      {
        id: 'addr1',
        label: 'Home',
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipCode: '90210',
        isDefault: true
      }
    ],
    paymentMethods: [
      {
        id: 'payment1',
        type: 'credit',
        lastFourDigits: '4321',
        expiryMonth: 12,
        expiryYear: 2025
      }
    ],
    orderHistory: [
      {
        id: 'order1',
        date: '2024-01-15',
        total: 299.99,
        status: 'completed'
      }
    ],
    wishlist: [
      {
        id: 'product1',
        name: 'Stylish Leather Jacket',
        price: 249.99,
        image: '/jacket-placeholder.jpg'
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <div className="bg-white shadow-md rounded-lg p-6 md:col-span-1">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center mb-4">
              <UserIcon className="w-6 h-6 mr-2 text-gray-600" />
              <h2 className="text-xl font-bold">Profile Overview</h2>
            </div>
            <Image 
              src={user.avatarUrl || '/default-avatar.png'} 
              alt={`${user.firstName} ${user.lastName}`}
              className="h-24 w-24 rounded-full object-cover mb-4"
              width={96}
              height={96}
            />
            <h3 className="text-xl font-bold">{user.firstName} {user.lastName}</h3>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.phone}</p>
            <button className="mt-4 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition flex items-center">
              <UserIcon className="w-4 h-4 mr-2" /> Edit Profile
            </button>
          </div>
        </div>

        {/* Addresses */}
        <div className="bg-white shadow-md rounded-lg p-6 md:col-span-2">
          <div className="flex items-center mb-4">
            <MapPin className="w-6 h-6 mr-2 text-gray-600" />
            <h3 className="text-lg font-semibold">Saved Addresses</h3>
          </div>
          {user.addresses.map(address => (
            <div 
              key={address.id} 
              className="border p-4 rounded-lg mb-4 flex justify-between items-center"
            >
              <div>
                <h4 className="font-semibold">{address.label}</h4>
                <p>{address.street}</p>
                <p>{address.city}, {address.state} {address.zipCode}</p>
                {address.isDefault && (
                  <span className="text-sm text-green-600 mt-2">
                    Default Address
                  </span>
                )}
              </div>
              <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition">
                Edit
              </button>
            </div>
          ))}
          <button className="w-full px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition">
            Add New Address
          </button>
        </div>

        {/* Payment Methods */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center mb-4">
            <CreditCard className="w-6 h-6 mr-2 text-gray-600" />
            <h3 className="text-lg font-semibold">Payment Methods</h3>
          </div>
          {user.paymentMethods.map(payment => (
            <div 
              key={payment.id} 
              className="border p-4 rounded-lg mb-4 flex justify-between items-center"
            >
              <div>
                <h4 className="font-semibold capitalize">{payment.type} Card</h4>
                <p>**** **** **** {payment.lastFourDigits}</p>
                <p>Expires {payment.expiryMonth}/{payment.expiryYear}</p>
              </div>
              <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition">
                Remove
              </button>
            </div>
          ))}
          <button className="w-full px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition">
            Add Payment Method
          </button>
        </div>

        {/* Order History */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Package className="w-6 h-6 mr-2 text-gray-600" />
            <h3 className="text-lg font-semibold">Order History</h3>
          </div>
          {user.orderHistory.map(order => (
            <div 
              key={order.id} 
              className="border p-4 rounded-lg mb-4 flex justify-between items-center"
            >
              <div>
                <h4 className="font-semibold">Order #{order.id}</h4>
                <p>Date: {order.date}</p>
                <p>Total: ${order.total.toFixed(2)}</p>
                <span 
                  className={`text-sm font-medium ${
                    order.status === 'completed' 
                      ? 'text-green-600' 
                      : order.status === 'processing' 
                      ? 'text-yellow-600' 
                      : 'text-blue-600'
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition">
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* Wishlist */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Heart className="w-6 h-6 mr-2 text-gray-600" />
            <h3 className="text-lg font-semibold">Wishlist</h3>
          </div>
          {user.wishlist.map(item => (
            <div 
              key={item.id} 
              className="border p-4 rounded-lg mb-4 flex items-center"
            >
              <Image 
                src={item.image} 
                alt={item.name} 
                className="w-20 h-20 object-cover mr-4 rounded"
                width={80}
                height={80}
              />
              <div className="flex-grow">
                <h4 className="font-semibold">{item.name}</h4>
                <p>${item.price.toFixed(2)}</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition flex items-center">
                  <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                </button>
                <button className="px-3 py-1 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}