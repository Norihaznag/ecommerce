"use client" ;
import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Users, 
  DollarSign, 
  Package,
  AlertCircle,
  Clock,
  BarChart2,
  Loader
} from 'lucide-react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

const StatCard = ({ title, value, icon: Icon, description, trend }) => (
  <div className="bg-white rounded-lg p-6 border border-gray-300">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <Icon className="h-5 w-5 text-gray-400" />
    </div>
    <div className="text-2xl font-bold text-gray-900 mb-2">{value}</div>
    <p className="text-xs text-gray-600">
      {trend && (
        <span className={trend.includes('+') ? 'text-green-600' : 'text-red-600'}>
          {trend}
        </span>
      )}{' '}
      {description}
    </p>
  </div>
);




// Define PDF styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff'
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#1a1a1a',
    fontWeight: 'bold'
  },
  subheader: {
    fontSize: 18,
    marginBottom: 10,
    color: '#4a4a4a',
    borderBottom: '1 solid #e0e0e0',
    paddingBottom: 5
  },
  section: {
    margin: 10,
    padding: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '5 0',
    borderBottom: '1 solid #f0f0f0'
  },
  text: {
    fontSize: 12,
    color: '#4a4a4a'
  },
  bold: {
    fontWeight: 'bold'
  },
  metricBox: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    margin: '5 0',
    borderRadius: 5
  },
  date: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 20,
    textAlign: 'center'
  }
});

// PDF Document Component
const PDFReport = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Store Performance Report</Text>
      <Text style={styles.date}>Generated on: {data.date}</Text>

      {/* Key Metrics Section */}
      <Text style={styles.subheader}>Key Metrics</Text>
      <View style={styles.section}>
        <View style={styles.metricBox}>
          <View style={styles.row}>
            <Text style={styles.text}>Total Revenue:</Text>
            <Text style={[styles.text, styles.bold]}>{data.stats.revenue}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Total Orders:</Text>
            <Text style={[styles.text, styles.bold]}>{data.stats.orders}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Active Products:</Text>
            <Text style={[styles.text, styles.bold]}>{data.stats.products}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Active Users:</Text>
            <Text style={[styles.text, styles.bold]}>{data.stats.users}</Text>
          </View>
        </View>
      </View>

      {/* Recent Orders Section */}
      <Text style={styles.subheader}>Recent Orders</Text>
      <View style={styles.section}>
        {data.recentOrders.map((order, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.text}>{order.customer}</Text>
            <Text style={styles.text}>{order.total}</Text>
            <Text style={styles.text}>{order.status}</Text>
          </View>
        ))}
      </View>

      {/* Low Stock Section */}
      <Text style={styles.subheader}>Low Stock Alerts</Text>
      <View style={styles.section}>
        {data.lowStockProducts.map((product, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.text}>{product.name}</Text>
            <Text style={[styles.text, { color: '#dc2626' }]}>
              Only {product.stock} units remaining
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const Dashboard = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const recentOrders = [
    { id: 1, customer: "John Doe", total: "$299.99", status: "Processing" },
    { id: 2, customer: "Jane Smith", total: "$199.50", status: "Shipped" },
    { id: 3, customer: "Bob Johnson", total: "$549.99", status: "Delivered" }
  ];

  const lowStockProducts = [
    { id: 1, name: "Wireless Headphones", stock: 3, threshold: 5 },
    { id: 2, name: "Smart Watch", stock: 2, threshold: 10 },
    { id: 3, name: "Phone Case", stock: 4, threshold: 15 }
  ];

  const getFormattedDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const reportData = {
    date: getFormattedDate(),
    stats: {
      revenue: "$15,231.89",
      orders: "156",
      products: "89",
      users: "2,338"
    },
    recentOrders,
    lowStockProducts
  };

  // Rest of the StatCard component and dashboard layout remains the same
  return (
    <div className=" min-h-screen">
      {/* Welcome Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back to your store overview.</p>
        </div>
        <PDFDownloadLink 
          document={<PDFReport data={reportData} />}
          fileName={`store-report-${new Date().toISOString().split('T')[0]}.pdf`}
          className={`
            flex items-center gap-2 px-6 py-2 rounded-lg
            bg-[#5a1a5a] hover:bg-[#752475]
            text-white transition-colors
          `}
        >
          {({ blob, url, loading, error }) => 
            loading ? (
              <div className="flex items-center gap-2">
                <Loader className="h-4 w-4 animate-spin" />
                Preparing PDF...
              </div>
            ) : (
              'Download Report'
            )
          }
        </PDFDownloadLink>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$15,231.89"
          icon={DollarSign}
          description="from last month"
          trend="+20.1%"
        />
        <StatCard
          title="Orders"
          value="156"
          icon={ShoppingBag}
          description="from last month"
          trend="+12.2%"
        />
        <StatCard
          title="Active Products"
          value="89"
          icon={Package}
          description="in your store"
        />
        <StatCard
          title="Active Users"
          value="2,338"
          icon={Users}
          description="from last month"
          trend="+5.7%"
        />
      </div>

      {/* Recent Orders and Inventory Alerts */}
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg border border-gray-300 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
          </div>
          <div className="space-y-4">
            {recentOrders.map(order => (
              <div key={order.id} className="flex items-center justify-between border-b border-gray-200 pb-4">
                <div>
                  <p className="font-medium text-gray-900">{order.customer}</p>
                  <p className="text-sm text-gray-600">{order.status}</p>
                </div>
                <p className="font-medium text-gray-900">{order.total}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white rounded-lg border border-gray-300 p-6">
          <div className="flex items-center gap-2 mb-6">
            <AlertCircle className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Low Stock Alerts</h2>
          </div>
          <div className="space-y-4">
            {lowStockProducts.map(product => (
              <div key={product.id} className="flex items-center justify-between border-b border-gray-200 pb-4">
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-red-500">
                    Only {product.stock} units left
                  </p>
                </div>
                <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                  Restock
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-lg border border-gray-300 p-6">
        <div className="flex items-center gap-2 mb-6">
          <BarChart2 className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-900">Sales Performance</h2>
        </div>
        <div className="h-64 flex items-center justify-center text-gray-500 border border-dashed border-gray-300 rounded-lg">
          Chart placeholder - Add your preferred charting library
        </div>
      </div>
    </div>
  );
};

export default Dashboard;