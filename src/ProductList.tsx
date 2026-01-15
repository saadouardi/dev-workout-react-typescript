import {useEffect, useState} from "react";
import type {Product} from "./Product.ts";

type CartItem = {
  product: Product
  quantity: number
}

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL
        const res = await fetch(`${baseUrl}/products`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data: Product[] = await res.json()
        setProducts(data)
      } catch (e) {
        setError("Could not load products. Please try again.")
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const addToCart = (product: Product) => () => {
    setCart( prev => {
      const existing = prev.find( item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? {...item, quantity: item.quantity + 1} : item)
      } else {
        return [...prev, {product, quantity: 1}]
      }
    })
  }
  const total = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  const count = cart.reduce((sum, i) => sum + i.quantity, 0)

  {error && (
    <div className="mb-4 rounded bg-red-100 p-3 text-red-700">
      {error}
    </div>
  )}

  {loading && (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl text-gray-600">Lädt...</div>
      </div>
    )
  }

  return (<>
    <h1 className="text-3xl font-bold text-gray-800 mb-6">Produktliste</h1>

    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {products.map((product, i) => (
          <li 
            key={product.id} 
            className={"p-4 hover:bg-gray-50 transition-colors " + (i % 2 ? "bg-gray-50" : "")}
          >
            <div className="flex justify-between items-center pl-6">
              <span className="text-lg font-medium text-gray-800">
                {product.name}
              </span>
              <span className="text-lg font-semibold text-blue-600">
                €{product.price.toFixed(2)}
              </span>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer" onClick={addToCart(product)}>+</button>
            </div>
          </li>
          ))}
      </ul>
    </div>
    <div className="mt-4 text-center text-gray-600">
      {count} Produkte im Warenkorb (€{total.toFixed(2)})
    </div>
  </>)
}