import React, {useContext } from 'react';
import {CartContext} from '../../Context/CartContext';
import { productsData } from '../../Data/productsData';
const Products = () => {
    const { addItemToCart} = useContext(CartContext);
    return (
        <div className="wrapper">
            <div className='list_product'>
                {productsData.map((product, i) => (
                    <div key={i} className="list_product__item">
                        <div className='list_product__item__box_img'>                                
                            <img src={product.image} alt={product.name} />
                        </div>
                        <div className='list_product__item__bottom'>
                            <p className='list_product__item__title'>{product.name}</p>
                            <p className='list_product__item__price'>S/{product.price}</p>
                            <button className="btn info" onClick={() => addItemToCart(product )}>Agregar al carrito</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;