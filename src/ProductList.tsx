import {useEffect, useState} from "react";
import type {Product} from "./Product.ts";
import Cart from "./Cart.ts";

export function ProductList() {
  const [products, setProducts] = useState([] as Product[])
  const [loading, setLoading] = useState(true)
  const [cart] = useState<Cart>(new Cart())

  useEffect(() => {
	  // Simuliere API-Aufruf mit Beispieldaten
	  const fetchProducts = async () => {
	    // Beispiel-JSON-Daten
	    const sampleData = [
	      {id: 1, name: 'Laptop', price: 899.99},
	      {id:   2, name: "Maus", price: 24.99},
	      {id: 3, name: "Tastatur",
	        price: 79.99 },
	      { id: 4, name: "Monitor", price: 299.99},
	      {id: 5, name: 'Headset', price: 59.99}     ,
	      {id: 5, name: 'USB Stick', price: 4.99}
	    ]

	    // Simuliere Netzwerk-Verzögerung
	    await new Promise(resolve => setTimeout(resolve, 500))

	    setProducts(sampleData)
	    setLoading(false)
		}

    fetchProducts()
  }, [])

  const addToCart = (product: Product) => () => {
    cart.addItem(product)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl text-gray-600">Lädt...</div>
      </div>
    )
  }

  return (<>
    <h1 className="text-3xl font-bold text-gray-800 mb-6">Produktliste</h1>

    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {products.map((product, i) => {
          if ((i % 2) === 0) return (<li key={product.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-center pl-6">
              <span className="text-lg font-medium text-gray-800">
                {product.name}
              </span>
              <span className="text-lg font-semibold text-blue-600">
                €{product.price.toFixed(2)}
              </span>
              <button onClick={addToCart(product)}>+</button>
            </div>
          </li>)
          else return (<li key={product.id} className="p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex justify-between items-center pl-3">
              <span className="text-lg font-medium text-gray-800">
                {product.name}
              </span>
              <span className="text-lg font-semibold text-blue-600">
                €{product.price.toFixed(2)}
              </span>
              <button className="mr-1" onClick={addToCart(product)}>+</button>
            </div>
          </li>)
        }
        )}
      </ul>
    </div>
    <div className="mt-4 text-center text-gray-600">
      {cart.getCount()} Produkte im Warenkorb (€{cart.getTotalPrice().toFixed(2)})
    </div>
  </>)
}