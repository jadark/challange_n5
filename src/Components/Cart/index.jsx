import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import ItemCart from "./../ItemCart";

const Cart = () => {
    // Detect DarkMode
    const [mode, setMode] = useState('light')
    useEffect(() => {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => onSelectMode(e.matches ? 'dark' : 'light'));
        onSelectMode(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        return () => {
                window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', () => {
            });
        }
    }, []);
    const onSelectMode = (mode) => {
        setMode(mode)
        if (mode === 'dark')
        document.body.classList.add('dark-mode')
        else
        document.body.classList.remove('dark-mode')
    }
    // fin Detect DarkMode

    const [cartOpen, setCartOpen] = useState(false)
    const [productsLength, setProductsLength] = useState(0)
    
    const {cartItems} = useContext(CartContext)
    
    useEffect(() => {
        setProductsLength(
            cartItems.reduce((prev, current) => prev +  current.amount, 0)
        )
    }, [cartItems])
    
    const total = cartItems.reduce((prev, current) => prev + current.amount * current.price, 0)

    return (
        <div className="header__cart">
            <div className="header__cart__theme">
            {
                mode === 'dark' ?
                    <svg className={'icons'} xmlns="http://www.w3.org/2000/svg" width={33} viewBox="0 0 24 24" fill="#f1e408"
                        onClick={() => onSelectMode('light')}>
                    <rect fill="none"/>
                    <path
                        d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"/>
                    </svg> :
                    <svg className={'icons'} xmlns="http://www.w3.org/2000/svg" width={33} viewBox="0 0 24 24" fill="#000000"
                        onClick={() => onSelectMode('dark')}>
                    <rect fill="none" height="24" width="24"/>
                    <path
                        d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"/>
                    </svg>
                }
            </div>
            <div onClick={() => setCartOpen(!cartOpen)} className={`header__cart__close ${cartOpen ? "active" : ""}`}></div>
            <div onClick={() => setCartOpen(!cartOpen)} className="header__cart__basket">
                <div className={`header__cart__basket__amount ${productsLength > 0 ? "active" : ""}`}>{ productsLength }</div>
                <svg className={`header__cart__basket__icon ${productsLength > 0 ? "active" : ""}`} width="30" height="27" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M29.733 6.64651C29.595 6.44711 29.4108 6.28414 29.196 6.17154C28.9813 6.05895 28.7425 6.00009 28.5 6.00001H7.9995L6.2685 1.84501C6.04153 1.29784 5.6572 0.830389 5.16424 0.501923C4.67127 0.173457 4.09187 -0.00123156 3.4995 6.53586e-06H0V3.00001H3.4995L10.6155 20.0775C10.7295 20.3507 10.9218 20.5841 11.1681 20.7483C11.4145 20.9125 11.7039 21 12 21H24C24.6255 21 25.185 20.6115 25.4055 20.028L29.9055 8.02801C29.9905 7.80094 30.0193 7.55664 29.9892 7.31603C29.9592 7.07543 29.8713 6.84569 29.733 6.64651Z"
                        fill="#b5b5b5" />
                    <path
                        d="M12.75 27C13.9926 27 15 25.9926 15 24.75C15 23.5074 13.9926 22.5 12.75 22.5C11.5074 22.5 10.5 23.5074 10.5 24.75C10.5 25.9926 11.5074 27 12.75 27Z"
                        fill="#b5b5b5" />
                    <path
                        d="M23.25 27C24.4926 27 25.5 25.9926 25.5 24.75C25.5 23.5074 24.4926 22.5 23.25 22.5C22.0074 22.5 21 23.5074 21 24.75C21 25.9926 22.0074 27 23.25 27Z"
                        fill="#b5b5b5" />
                </svg>
            </div>
            {cartItems && cartOpen && (
                <div className="header__cart__container">
                    {cartItems.length === 0 ? (
                        <div className="header__cart__empty"><img src="https://res.cloudinary.com/sivadass/image/upload/v1495427934/icons/empty-cart.png" alt="No hay productos" /><p>Tu carrito está vacio</p></div>
                    ) : (
                        <div className="header__cart__list">
                            {cartItems.map((item, i) => {
                                return <ItemCart key={i} item={item} />
                            })}
                        </div>
                    )}
                    {cartItems.length > 0 && (<h3 className="header__cart__total">Total: S/{total}</h3>)}
                </div>
            )}
        </div>
    );
}

export default Cart;