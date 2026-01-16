import React, { useEffect, useRef, useState } from "react"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/context/CartContext"

export const Header: React.FC = () => {
    const { items, count, total, add, removeOne, clear } = useCart()
    const [open, setOpen] = useState(false)
    const boxRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
        if (!boxRef.current) return
        if (!boxRef.current.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener("mousedown", onClickOutside)
        return () => document.removeEventListener("mousedown", onClickOutside)
    }, [])

    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-800">Micromerce Workout</h1>

                <div className="relative" ref={boxRef}>
                    <button
                        type="button"
                        className="flex items-center gap-2 rounded px-2 py-1 hover:bg-gray-100 cursor-pointer"
                        onClick={() => setOpen(o => !o)}
                        aria-label="Open cart"
                    >
                        <ShoppingCart />
                        <span className="text-sm font-medium text-gray-700">{count}</span>
                    </button>

                    {open && (
                        <div className="absolute right-0 mt-2 w-80 rounded-lg bg-white shadow-lg border border-gray-200 p-3 z-50">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-gray-800">Cart</span>
                                {items.length > 0 && (
                                <button
                                    className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
                                    onClick={clear}
                                >
                                    Clear
                                </button>
                                )}
                            </div>

                            {items.length === 0 ? (
                                <div className="text-sm text-gray-500">Your cart is empty.</div>
                            ) : (
                                <div className="space-y-2 max-h-64 overflow-auto">
                                    {items.map(i => (
                                        <div
                                            key={i.product.id}
                                            className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2"
                                        >
                                            <div className="min-w-0">
                                                <div className="text-sm font-medium text-gray-800 truncate">
                                                {i.product.name}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                €{i.product.price.toFixed(2)} each
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    className="h-8 w-8 rounded bg-gray-100 hover:bg-gray-200 font-bold cursor-pointer"
                                                    onClick={() => removeOne(i.product.id)}
                                                    aria-label="Remove one"
                                                >
                                                    –
                                                </button>
                                                <span className="w-6 text-center text-sm font-medium">
                                                    {i.quantity}
                                                </span>
                                                <button
                                                    className="h-8 w-8 rounded bg-gray-100 hover:bg-gray-200 font-bold cursor-pointer"
                                                    onClick={() => add(i.product)}
                                                    aria-label="Add one"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <div className="text-sm font-semibold text-blue-600">
                                                €{(i.product.price * i.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="mt-3 flex items-center justify-between">
                                <span className="text-sm text-gray-600">Total</span>
                                <span className="text-sm font-semibold text-gray-800">
                                    €{total.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
