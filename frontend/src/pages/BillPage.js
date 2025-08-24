import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API = "http://127.0.0.1:5000";

export default function BillPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all orders and find the specific one by id
    axios.get(`${API}/getAllOrders`)
      .then(res => {
        const o = res.data.find(order => String(order.order_id) === String(id));
        setOrder(o || null);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching order:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading bill...</p>;
  if (!order) return <p>Order not found!</p>;

  const grandTotal = order.order_details.reduce((sum, item) => sum + item.total_price, 0);

  const handlePrint = () => window.print();

  const handleWhatsApp = () => {
    const text = `Order #${order.order_id}\nCustomer: ${order.customer_name}\n` +
      order.order_details.map(item => `${item.product_name} x ${item.quantity} = ₹${item.total_price}`).join("\n") +
      `\nGrand Total: ₹${grandTotal}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="card max-w-xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Bill</h2>
      <p><b>Order ID:</b> {order.order_id}</p>
      <p><b>Customer:</b> {order.customer_name}</p>
      <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-2 py-1 text-left">Product</th>
            <th className="border border-gray-300 px-2 py-1">Qty</th>
            <th className="border border-gray-300 px-2 py-1">Unit Price</th>
            <th className="border border-gray-300 px-2 py-1">Amount</th>
          </tr>
        </thead>
        <tbody>
          {order.order_details.map(item => (
            <tr key={item.product_id}>
              <td className="border border-gray-300 px-2 py-1">{item.product_name}</td>
              <td className="border border-gray-300 px-2 py-1 text-center">{item.quantity}</td>
              <td className="border border-gray-300 px-2 py-1 text-right">₹{item.price_per_unit}</td>
              <td className="border border-gray-300 px-2 py-1 text-right">₹{item.total_price}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-bold bg-gray-100">
            <td className="border border-gray-300 px-2 py-1 text-right" colSpan="3">Grand Total</td>
            <td className="border border-gray-300 px-2 py-1 text-right">₹{grandTotal}</td>
          </tr>
        </tfoot>
      </table>

      <div className="flex flex-wrap gap-3 mt-4">
        <button onClick={handlePrint} className="btn">Print</button>
        <button onClick={handleWhatsApp} className="btn btn-whatsapp">Share WhatsApp</button>
        <Link className="btn" to="/add-order">Add Another Order</Link>
        <Link className="btn-outline" to="/">Back to Dashboard</Link>
      </div>
    </div>
  );
}
