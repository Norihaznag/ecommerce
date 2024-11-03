"use client";
import React, { useState, useEffect } from "react";
import { Search, Eye } from "lucide-react";
import OrderDetailsModal from "@/app/components/OrderDetailsModal";
import Pagination from "@/app/components/Pagination";
import { useSearchParams ,useRouter } from "next/navigation";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const status = [
    { name: 'Pending', color: 'bg-yellow-500' },
    { name: 'Processing', color: 'bg-blue-500' },
    { name: 'Shipped', color: 'bg-indigo-500' },
    { name: 'Delivered', color: 'bg-green-500' },
    { name: 'Cancelled', color: 'bg-red-500' },
    { name: 'Returned', color: 'bg-gray-500' },
  ];
  

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/orders");
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      setOrders(data);
      setFilteredOrders(data);
    } catch (error) {
      console.error("Using dummy data due to error:", error);
      const dummyData = [
        { id: 1, customerName: "John Doe", total: 59.99, status: "Pending" },
        { id: 2, customerName: "Jane Smith", total: 89.99, status: "Processing" },
        { id: 3, customerName: "Mike Johnson", total: 120.0, status: "Shipped" },
        { id: 4, customerName: "Emily Davis", total: 200.75, status: "Delivered" },
      ];
      setOrders(dummyData);
      setFilteredOrders(dummyData);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    setFilteredOrders(updatedOrders);
  };

  useEffect(() => {
    const filtered = orders.filter(
      (order) =>
        order.id.toString().includes(searchTerm) &&
        (filterStatus === "" || order.status === filterStatus)
    );
    setFilteredOrders(filtered);
  }, [searchTerm, filterStatus, orders]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailsModalOpen(true);
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center space-x-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >

          {
            status.map((s, i)=><option key={`${i}${s.name}`} value="Pending">Pending</option>
          )
          }
          <option value="">All Statuses</option>
      
        </select>
      </div>

      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Order ID</th>
              <th className="px-6 py-3 text-left">Customer</th>
              <th className="px-6 py-3 text-left">Total</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">#{order.id}</td>
                <td className="px-6 py-4">{order.customerName}</td>
                <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className={`px-2 py-1 rounded-full text-xs font-semibold
                      
                      `}
                  >
                    <option value="Pending" className="bg-yellow-200">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => handleViewDetails(order)}>
                    <Eye size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      <Pagination pagination={{ page : 2 , pageCount : 3 }}  />


      <OrderDetailsModal
        // order={selectedOrder}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />
    </div>
  );
};

export default OrderManagement;
