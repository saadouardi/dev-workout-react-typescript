import { useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom"
import { useCart } from "../context/CartContext"
import type { Product } from "../types/Product.ts";
import Loading from "../components/Loading.tsx";

export function ProductList() {
  let navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const { add } = useCart()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const res = await fetch(`${baseUrl}/products`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (e) {
        setError("Could not load products. Please try again.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (product: Product) => () => navigate(`/products/${product.id}`);

  const addToCart = (product: Product) => () => add(product);
  
  if (loading) return <Loading />

  if (error) {
    return (
      <div className="mb-4 rounded bg-red-100 p-3 text-red-700">
        {error}
      </div>
    )
  }


  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Produktliste</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {products.map((product, i) => (
            <li
              key={product.id}
              className={
                "p-4 hover:bg-gray-50 transition-colors " +
                (i % 2 ? "bg-gray-50" : "")
              }
            >
              <div 
                className="flex justify-between items-center pl-6"
              >
                <span className="text-lg font-medium text-gray-800">
                  {product.name}
                </span>
                <span className="text-lg font-semibold text-blue-600">
                  €{product.price.toFixed(2)}
                </span>
                <div className="flex gap-2">
                  <button
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
                    onClick={handleProductClick(product)}
                  >
                    Product Detail
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
                    onClick={addToCart(product)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
