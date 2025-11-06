import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <CartProvider>
      <OrderProvider>
        <App />
      </OrderProvider>
    </CartProvider>
  </React.StrictMode>
);
