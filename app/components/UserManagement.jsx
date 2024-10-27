"use client";
import React, { useState } from 'react';
import { 
   Edit, Trash2, Search, Filter, PlusCircle  , XCircle
} from 'lucide-react';

const UsersManagement = () => {
  const [users, setUsers] = useState([
    {
      id: '1',
      username: 'johndoe',
      email: 'johndoe@example.com',
      role: 'Moderator',
      createdAt: '2023-04-15T10:30:00Z',
    },
    {
      id: '2',
      username: 'hassandoe',
      email: 'hassandoe@example.com',
      role: 'User',
      createdAt: '2023-05-15T10:30:00Z',
    }
    
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !roleFilter || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-6">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <div className="flex gap-4 flex-wrap">
          <div className="relative">
            <select
              className="w-48 px-4 py-2 border rounded-lg appearance-none bg-white pr-10"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">All Roles</option>
              <option value="User">User</option>
              <option value="Moderator">Moderator</option>
              <option value="Admin">Admin</option>
            </select>
            <Filter className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              className="w-64 px-4 py-2 border rounded-lg pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <PlusCircle className="w-4 h-4" />
          Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map(user => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedUser(user)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:underline px-3">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:underline px-3">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Sidebar */}
      {selectedUser && (
        <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{selectedUser.username}</h3>
                <p className="text-gray-600">{selectedUser.email}</p>
              </div>
              <button 
                onClick={() => setSelectedUser(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div>
              <h4 className="font-medium mb-2">Update Role</h4>
              <div className="space-y-3">
                <select
                  value={selectedUser.role}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="User">User</option>
                  <option value="Moderator">Moderator</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;
