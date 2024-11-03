import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define styles optimized for A5 and minimal size
const styles = StyleSheet.create({
  page: {
    padding: 15,
    width: 420,  // A5 width
    height: 595, // A5 height
  },
  section: {
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 10,
    marginBottom: 3,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    paddingBottom: 3,
    marginBottom: 3,
  },
});

const OrderPDFDocument = ({ order }) => (
  <Document>
    <Page size={[420, 595]} style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Order #{order.id}</Text>
        <Text style={styles.text}>Customer: {order.customerName}</Text>
        <Text style={styles.text}>Email: {order.customerEmail}</Text>
        <Text style={styles.text}>Status: {order.status}</Text>
        <Text style={styles.text}>Total: ${order.total.toFixed(2)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Items</Text>
        {order.items.map(item => (
          <View key={item.id} style={styles.item}>
            <Text>{item.name}</Text>
            <Text>{item.quantity} x ${item.price.toFixed(2)}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const OrderDetailsModal = ({ 
  order = {
    id: 12345,
    customerName: 'John Doe',
    customerEmail: 'johndoe@example.com',
    status: 'Pending',
    total: 85.50,
    items: [
      { id: 1, name: 'Burger', quantity: 2, price: 5.00 },
      { id: 2, name: 'Fries', quantity: 3, price: 2.50 },
      { id: 3, name: 'Soda', quantity: 1, price: 1.50 },
      { id: 4, name: 'Pizza', quantity: 1, price: 15.00 },
      { id: 5, name: 'Ice Cream', quantity: 2, price: 3.50 },
    ],
  }, 
  isOpen, 
  onClose 
}) => {

  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Order #{order.id}</h2>
        
        <div className="space-y-2">
          <p><strong>Customer:</strong> {order.customerName}</p>
          <p><strong>Email:</strong> {order.customerEmail}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
        </div>

        <h3 className="mt-4 mb-2 font-semibold">Items</h3>
        <div className="border-t pt-2">
          {order.items.map(item => (
            <div key={item.id} className="flex justify-between">
              <span>{item.name}</span>
              <span>{item.quantity} x ${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="flex space-x-2 mt-4">
          <PDFDownloadLink
            document={<OrderPDFDocument order={order} />}
            fileName={`Order_${order.id}.pdf`}
            className="flex-1 bg-red-800 text-white py-2 rounded-md text-center"
          >
            {({ loading }) => (loading ? "Loading PDF..." : "Download PDF")}
          </PDFDownloadLink>
          
          <button 
            onClick={onClose} 
            className="flex-1 bg-black text-white py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
