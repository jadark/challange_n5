import React, {useContext} from "react";
import {CartContext} from "../../Context/CartContext";

const ItemCart = ({ item }) => {
    const { deleteItemToCart, addItemToCart, deleteItem } = useContext(CartContext);
    return (
        <div className="header__cart__list__item">
            <div className="header__cart__list__item__box_img">
                <img src={item.image} alt={item.name} />
            </div>
            <div className="header__cart__list__item__content">
                <p className="header__cart__list__item__name">{item.name}</p>
                <p className="header__cart__list__item__amount">{item.amount}</p>
                <p className="header__cart__list__item__buttons">
                    <button onClick={() => addItemToCart(item)}>+</button>
                    <button onClick={() => deleteItemToCart(item)}>-</button>
                </p>
                <p className="header__cart__list__item__price">Total: <strong>S/{item.amount * item.price}</strong></p>
            </div>
            <button className="header__cart__list__item__close" onClick={() => deleteItem(item)}>X</button>
        </div>
    );
};
export default ItemCart;