import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [orderComplete, setOrderComplete] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = +(subtotal * 0.07).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder = {
      id: 'ORD-' + Date.now().toString(36) + Math.random().toString(36).slice(2,7),
      date: new Date().toLocaleString(),
      total,
      status: "Processing",
      items: cartItems.map((i) => ({ name: i.name, qty: i.quantity, price: i.price })),
    };
    addOrder(newOrder);
    clearCart();
    setTimeout(() => setOrderComplete(true), 600);
  };

  if (orderComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-4" />
        </motion.div>
        <h2 className="text-3xl font-semibold">Order Confirmed 🎉</h2>
        <p className="text-gray-500 max-w-md">Thank you for shopping with Sendo Atelier. You’ll receive a confirmation email shortly.</p>
        <Link to="/orders">
          <Button className="rounded-full px-6 py-3 text-base">View Orders</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
      <motion.div className="lg:col-span-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" required />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="you@example.com" required />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="123 Fashion St, City" required />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Lagos" required />
              </div>
              <div>
                <Label htmlFor="zip">ZIP / Postal Code</Label>
                <Input id="zip" placeholder="100001" required />
              </div>
            </div>
            <div>
              <Label>Payment Method</Label>
              <Select required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Credit / Debit Card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full mt-4 py-3 rounded-full text-base font-medium">Confirm Order</Button>
          </form>
        </Card>
      </motion.div>

      <motion.div className="lg:col-span-1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
        <Card className="p-6 sticky top-24">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Tax (7%)</span><span>${tax.toFixed(2)}</span></div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg"><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
