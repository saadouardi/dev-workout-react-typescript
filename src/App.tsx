import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import { CartProvider } from "@/context/CartContext"
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductList } from "@/pages/ProductList";
import { ProductDetail  } from "@/pages/ProductDetail";

export default function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-100 py-8 px-4">
            <Header/>
            <main>
              <div className="max-w-2xl mx-auto p-6">
                <Routes>
                  <Route path="/" element={<ProductList />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </main>
            <Footer/>
          </div>
        </BrowserRouter>
      </CartProvider>
    </HelmetProvider>
  );
}
