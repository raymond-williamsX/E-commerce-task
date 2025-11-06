import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/context/OrderContext";

export default function OrderHistory() {
  const { orders } = useOrders();

  return (
    <div className="container mx-auto px-4 py-10 md:py-16">
      <motion.h1 className="text-3xl font-bold mb-8 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        Order History
      </motion.h1>

      <div className="space-y-8 max-w-4xl mx-auto">
        {orders.length === 0 && <p className="text-center text-gray-500">You have no orders yet.</p>}
        {orders.map((order, index) => (
          <motion.div key={order.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
            <Card className="border-gray-200 shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-6 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">Order ID: {order.id}</h2>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <span className={`mt-2 md:mt-0 inline-block px-3 py-1 rounded-full text-sm font-medium ${order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {order.status}
                  </span>
                </div>

                <Separator />

                <div className="space-y-2">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-gray-700">
                      <span>{item.name} × {item.qty}</span>
                      <span>${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>

                <div className="flex justify-end">
                  <Button variant="outline" className="mt-4 rounded-full">View Details</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
