import { useEffect, createContext, useState } from "react";

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const productsStorage = localStorage.getItem('cartProducts');
            return productsStorage ? JSON.parse(productsStorage) : [];
        } catch (e) {
            return [];
        }
    })

    useEffect(() => {
        localStorage.setItem('cartPRoducts', JSON.stringify(cartItems));
        // console.log({cartItems})
    }, [cartItems]);
    
    const addItemToCart = (product) => {
        const inCart = cartItems.find((prouctInCart) => prouctInCart.id === product.id);
        if (inCart) {
            setCartItems(
                cartItems.map((productInCart) => {
                    if (productInCart.id === product.id) {
                        return { ...inCart, amount: inCart.amount + 1 }
                    } else return productInCart;
                })
            )
        } else {
            setCartItems([...cartItems, {...product, amount: 1}])
        }
    }

    const deleteItemToCart = (product) => {
        const inCart = cartItems.find((prouctInCart) => prouctInCart.id === product.id);
        if (inCart.amount === 1) {
            setCartItems(
                cartItems.filter((productInCart) => productInCart.id !== product.id)
            );
        } else {
            setCartItems(
                cartItems.map((productInCart) => {
                    if (productInCart.id === product.id) {
                        return { ...inCart, amount: inCart.amount - 1 }
                    } else return productInCart;
                })
            )
        }
    }
    const deleteItem = (product) => {
        const inCart = cartItems.find((prouctInCart) => prouctInCart.id === product.id);
        console.log({inCart})
        setCartItems(
            cartItems.filter((productInCart) => productInCart.id !== product.id)
        );
    }

    return (
        <CartContext.Provider value={{cartItems, addItemToCart, deleteItemToCart, deleteItem}}>
            {children }
        </CartContext.Provider>
    )
}