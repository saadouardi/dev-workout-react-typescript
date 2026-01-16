import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import type { Product } from "../types/Product.ts";
import Loading from "../components/Loading.tsx";

export function ProductDetail() {
    const { id } = useParams()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProduct = async () => {
        try {
            setError(null)
            const baseUrl = import.meta.env.VITE_API_BASE_URL
            const res = await fetch(`${baseUrl}/products`)
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            const data: Product[] = await res.json()

            const found = data.find(p => p.id === Number(id))
            if (!found) {
                setError("Product not found.")
                setProduct(null)
            } else {
                setProduct(found)
            }
        } catch (e) {
            setError("Could not load product.")
            setProduct(null)
            console.error(e)
        } finally {
            setLoading(false)
        }
        }

        fetchProduct()
    }, [id])

    if (loading) return <Loading />

    if (error) {
        return (
            <div className="space-y-4">
                <Link to="/" className="text-blue-600 hover:underline">
                ← Back to list
                </Link>
                <div className="rounded bg-red-100 p-3 text-red-700">{error}</div>
            </div>
        )
    }

    if (!product) return null

    return (
        <div className="space-y-4">
            <Link to="/" className="text-blue-600 hover:underline">
                ← Back to list
            </Link>

            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
                        <p className="mt-2 text-gray-600">{product.description ?? "No description."}</p>
                    </div>
                    <div className="text-lg font-semibold text-blue-600">
                        €{product.price.toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    )
}
