import React from 'react';

export default React.createContext({
    user: {},

    currency: 'EUR',

    rates: {},

    isAdmin: false,

    isManager: false,

    cart: [],

    setUserData: user => {},

    setUserCurrency: (currency) => {},

    addToCart: (product, quantity) => {},

    removeFromCart: (product) => {},

    clearCart: () => {}
})
