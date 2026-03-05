import { createContext, useState, useEffect, useContext } from 'react';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cartItems');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item, quantity = 1) => {
        const existingItem = cartItems.find((x) => x._id === item._id);
        if (existingItem) {
            setCartItems(
                cartItems.map((x) =>
                    x._id === existingItem._id ? { ...x, quantity: x.quantity + quantity } : x
                )
            );
        } else {
            setCartItems([...cartItems, { ...item, quantity }]);
        }
    };

    const removeFromCart = (id) => {
        setCartItems(cartItems.filter((x) => x._id !== id));
    };

    const clearCart = () => setCartItems([]);

    const getCartTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getCartTotal }}>
            {children}
        </CartContext.Provider>
    );
};
