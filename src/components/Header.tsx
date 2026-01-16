import React from "react"
import { ShoppingCart } from "lucide-react"
import { useCart } from "../context/CartContext"

export const Header: React.FC = () => {
    const { count } = useCart()

    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-800">Micromerce Workout</h1>

                <div className="relative flex items-center gap-2">
                    <ShoppingCart />
                    <span className="text-sm font-medium text-gray-700">{count}</span>
                </div>
            </div>
        </header>
    )
}
