import React, { Component } from 'react';
import Products from './../Products';
import Cart from './../Cart';

class Home extends Component {
    render() {
        return (
            <div>
                <Cart />
                <Products />
            </div>
        );
    }
}

export default Home;