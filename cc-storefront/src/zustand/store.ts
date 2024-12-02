import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Product {
    id: number;
    title: string;
    price: number;
    images: string[];
}

interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartState {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    increaseQuantity: (productId: number) => void;
    decreaseQuantity: (productId: number) => void;
    clearCart: () => void;
}

const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cartItems: [],

            addToCart: (product) =>
                set((state) => {
                    const existingItem = state.cartItems.find((item) => item.id === product.id);

                    if (existingItem) {
                        return {
                            cartItems: state.cartItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)),
                        };
                    }

                    return {
                        cartItems: [
                            ...state.cartItems,
                            {
                                id: product.id,
                                title: product.title,
                                price: product.price,
                                image: product.images[0],
                                quantity: 1,
                            },
                        ],
                    };
                }),

            removeFromCart: (productId) =>
                set((state) => ({
                    cartItems: state.cartItems.filter((item) => item.id !== productId),
                })),

            increaseQuantity: (productId) =>
                set((state) => ({
                    cartItems: state.cartItems.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item)),
                })),

            decreaseQuantity: (productId) =>
                set((state) => ({
                    cartItems: state.cartItems.map((item) => (item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item)),
                })),

            clearCart: () => set({ cartItems: [] }),
        }),
        {
            name: "cart-storage",
            // storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useCartStore;
