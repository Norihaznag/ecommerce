"use client";
import React, { useState } from 'react';
import { 
  User2 as UserIcon, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  Camera 
} from 'lucide-react';
import Image from 'next/image';


export default function EditProfilePage() {
  // Initial user data
  const [userData, setUserData] = useState({
    personalInfo: {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      phone: '+1 (555) 123-4567',
      avatar: '/placeholder-avatar.jpg'
    },
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '90210',
      country: 'United States'
    },
    paymentMethod: {
      cardType: 'credit',
      cardNumber: '4321 5678 9012 3456',
      expiryMonth: '12',
      expiryYear: '2025',
      cvv: '123'
    }
  });

  // State for file upload
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Handle input changes
  const handleInputChange = (section, field, value) => {
    setUserData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Handle avatar upload
  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader);
        handleInputChange('personalInfo', 'avatar', reader);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the updated data to your backend
    console.log('Updated User Data:', userData);
    alert('Profile Updated Successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        {/* Personal Information Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex items-center mb-6">
            <UserIcon className="w-6 h-6 mr-2 text-gray-600" />
            <h2 className="text-xl font-bold">Personal Information</h2>
          </div>

          {/* Avatar Upload */}
          <div className="flex items-center mb-6">
            <div className="relative">
              <Image 
                src={"/placeholder-avatar.jpg"}
                alt="Profile Avatar" 
                className="w-24 h-24 rounded-full object-cover mr-4"
                height={96}
                width={96}
              />
              <label 
                htmlFor="avatarUpload" 
                className="absolute bottom-0 right-4 bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600"
              >
                <Camera className="w-4 h-4" />
                <input 
                  type="file" 
                  id="avatarUpload" 
                  accept="image/*" 
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
              </label>
            </div>
          </div>

          {/* Name and Contact Inputs */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">First Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  value={userData.personalInfo.firstName}
                  onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                  className="w-full pl-10 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter first name"
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 font-medium">Last Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  value={userData.personalInfo.lastName}
                  onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                  className="w-full pl-10 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter last name"
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 font-medium">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="email" 
                  value={userData.personalInfo.email}
                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                  className="w-full pl-10 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address"
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 font-medium">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="tel" 
                  value={userData.personalInfo.phone}
                  onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                  className="w-full pl-10 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter phone number"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex items-center mb-6">
            <MapPin className="w-6 h-6 mr-2 text-gray-600" />
            <h2 className="text-xl font-bold">Shipping Address</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">Street Address</label>
              <input 
                type="text" 
                value={userData.address.street}
                onChange={(e) => handleInputChange('address', 'street', e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter street address"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">City</label>
              <input 
                type="text" 
                value={userData.address.city}
                onChange={(e) => handleInputChange('address', 'city', e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter city"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">State/Province</label>
              <input 
                type="text" 
                value={userData.address.state}
                onChange={(e) => handleInputChange('address', 'state', e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter state/province"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Zip/Postal Code</label>
              <input 
                type="text" 
                value={userData.address.zipCode}
                onChange={(e) => handleInputChange('address', 'zipCode', e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter zip/postal code"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">Country</label>
              <input 
                type="text" 
                value={userData.address.country}
                onChange={(e) => handleInputChange('address', 'country', e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter country"
              />
            </div>
          </div>
        </div>

        {/* Payment Method Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex items-center mb-6">
            <CreditCard className="w-6 h-6 mr-2 text-gray-600" />
            <h2 className="text-xl font-bold">Payment Method</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">Card Type</label>
              <select 
                value={userData.paymentMethod?.cardType}
                onChange={(e) => handleInputChange('paymentMethod', 'cardType', e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="credit">Credit Card</option>
                <option value="debit">Debit Card</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium">Card Number</label>
              <input 
                type="text" 
                value={userData.paymentMethod?.cardNumber}
                onChange={(e) => handleInputChange('paymentMethod', 'cardNumber', e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="**** **** **** ****"
                maxLength={19}
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Expiry Month</label>
              <select 
                value={userData.paymentMethod?.expiryMonth}
                onChange={(e) => handleInputChange('paymentMethod', 'expiryMonth', e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                  <option key={month} value={month.toString().padStart(2, '0')}>
                    {month.toString().padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium">Expiry Year</label>
              <select 
                value={userData.paymentMethod?.expiryYear}
                onChange={(e) => handleInputChange('paymentMethod', 'expiryYear', e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Array.from({length: 10}, (_, i) => new Date().getFullYear() + i).map(year => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium">CVV</label>
              <input 
                type="text" 
                value={userData.paymentMethod?.cvv}
                onChange={(e) => handleInputChange('paymentMethod', 'cvv', e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="CVV"
                maxLength={4}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button 
            type="button" 
            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}