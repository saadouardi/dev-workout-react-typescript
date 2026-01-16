import { createContext, useContext, useMemo, useState } from "react"
import type { Product } from "../types/Product"

type CartItem = { product: Product; quantity: number }

type CartContextValue = {
    items: CartItem[]
    add: (product: Product) => void
    count: number
    total: number
    removeOne: (productId: number) => void
    clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])

    const add = (product: Product) => {
            setItems(prev => {
                const existing = prev.find(i => i.product.id === product.id)
                if (existing) {
                    return prev.map(i =>
                    i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
                    )
                }
                return [...prev, { product, quantity: 1 }]
            })
    }

    const removeOne = (productId: number) => {
        setItems(prev => {
            const existing = prev.find(i => i.product.id === productId)
            if (!existing) return prev

            if (existing.quantity <= 1) {
                return prev.filter(i => i.product.id !== productId)
            }

            return prev.map(i =>
                i.product.id === productId ? { ...i, quantity: i.quantity - 1 } : i
            )
        })
    }

    const clear = () => setItems([])


    const count = useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items])
    const total = useMemo(() => items.reduce((s, i) => s + i.product.price * i.quantity, 0), [items])

    const value = useMemo(() => ({ items, add, removeOne, clear, count, total }), [items, count, total])

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error("useCart must be used inside CartProvider")
    return ctx
}
