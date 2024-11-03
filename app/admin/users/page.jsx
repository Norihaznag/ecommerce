"use client";
import { useState } from "react";
import { Search, UserPlus, Edit, Trash2 } from "lucide-react";
import EditUserModal from "@/app/components/EditUserModal";
const UsersManagement = () => {
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "John Doe",
      username: "johndoe",
      email: "john@example.com",
      role: "admin",
      status: "active",
      createdAt: "2024-03-15T10:30:00Z",
      lastLogin: "2024-04-20T15:45:00Z",
    },
    {
      id: "2",
      name: "Jane Smith",
      username: "janesmith",
      email: "jane@example.com",
      role: "moderator",
      status: "inactive",
      createdAt: "2024-02-10T08:20:00Z",
      lastLogin: "2024-04-19T11:30:00Z",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleAddUser = (newUser) => {
    const userWithId = {
      ...newUser,
      id: (users.length + 1).toString(),
      createdAt: new Date().toISOString(),
      lastLogin: null,
    };
    setUsers([...users, userWithId]);
  };

  const handleEditUser = (updatedUser) => {
    setUsers(
      users.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      )
    );
  };

  const filteredUsers = users.filter((user) => {
    const searchMatch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase());
    const roleMatch = !roleFilter || user.role === roleFilter;
    const statusMatch = !statusFilter || user.status === statusFilter;
    return searchMatch && roleMatch && statusMatch;
  });

  const UserEdite = ({ isVisible, Editable }) => {
    return <div className=""></div>;
  };

  return (
    <div className="min-h-screen ">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Manage Users</h2>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-purple-500"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
            <option value="user">User</option>
          </select>
          <button
            onClick={() => setIsAddUserDialogOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            <UserPlus className="h-5 w-5" />
            Add New User
          </button>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium">NAME</th>
                <th className="text-left p-4 font-medium">ROLE</th>
                <th className="text-left p-4 font-medium">STATUS</th>
                <th className="text-left p-4 font-medium">LAST LOGIN</th>
                <th className="text-right p-4 font-medium">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">
                        {user.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {user.email}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-sm
                      ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : user.role === "moderator"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-sm
                      ${
                        user.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status.charAt(0).toUpperCase() +
                        user.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500">
                    {new Date(user.lastLogin).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="text-purple-600 hover:text-purple-800"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setIsDeleteDialogOpen(true);
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Delete Modal */}
        {isDeleteDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">Delete User</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this user? This action cannot be
                undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  onClick={() => {
                    setUsers(
                      users.filter((user) => user.id !== selectedUser?.id)
                    );
                    setIsDeleteDialogOpen(false);
                    setSelectedUser(null);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit User Modal */}
        {isAddUserDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">
                {selectedUser ? "Edit User" : "Add New User"}
              </h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-purple-500"
                />
                <select className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-purple-500">
                  <option value="admin">Admin</option>
                  <option value="moderator">Moderator</option>
                  <option value="user">User</option>
                </select>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    onClick={() => setIsAddUserDialogOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                  >
                    {selectedUser ? "Save Changes" : "Add User"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <EditUserModal
        isOpen={isEditModalOpen || !!selectedUser}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
        onSave={selectedUser ? handleEditUser : handleAddUser}
        user={selectedUser}
      />
    </div>
  );
};

export default UsersManagement;
