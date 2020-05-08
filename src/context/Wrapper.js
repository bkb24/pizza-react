import React, { useState } from 'react'
import StoreContext from './store-context'
import { addItemToCart, removeItemFromCart, flushCart } from '../services/cart'
import { inCart } from '../utils/products'

const Wrapper = props => {
    const [user, setUser] = useState(window.appData ? window.appData.user : {})
    const [currency, setCurrency] = useState(window.appData ? window.appData.currency : 'EUR')
    const [rates, ] = useState(window.appData ? window.appData.rates : {})
    const [isAdmin, ] = useState(window.appData ? window.appData.isAdmin : false)
    const [isManager, ] = useState(window.appData ? window.appData.isManager : false)
    const [cart, setCart] = useState(window.appData ? window.appData.cart : [])

    const setUserData = user => {
        setUser(user)
    }

    const setUserCurrency = (currency) => {
        setCurrency(currency)
    }

    const addToCart = (product, quantity) => {
        if (!isChanged(product, quantity)) return

        addItemToCart(product.id, quantity)
            .then(response => {
                setItemToCart(product, quantity)
            })
    }

    const removeFromCart = (product) => {
        if (!inCart(product, cart)) return

        removeItemFromCart(product.id)
            .then(response => {
                deleteItemFromCart(product)
            })
    }

    const clearCart = () => {
        flushCart()
            .then(response => {
                setCart([])
            })
    }

    const isChanged = (product, quantity) => {
        let cartItem = inCart(product, cart)
        return cartItem ? cartItem.quantity !== quantity : true
    }

    const setItemToCart = (product, quantity) => {
        let newCart = [...cart]
        let index = newCart.findIndex(item => item.product.id === product.id)

        if (index > -1) {
            let item = { product, quantity }
            newCart[index] = item
        } else {
            newCart.push({ product, quantity })
        }

        setCart(newCart)
    }

    const deleteItemFromCart = (product) => {
        let newCart = [...cart]
        let index = newCart.findIndex(item => item.product.id === product.id)
        newCart.splice(index, 1)
        setCart(newCart)
    }

    return (
        <StoreContext.Provider
            value={{
                user,
                currency,
                rates,
                isAdmin,
                isManager,
                cart,
                setUserData,
                addToCart,
                removeFromCart,
                clearCart,
                setUserCurrency
            }}
        >
            {props.children}
        </StoreContext.Provider>
    )
}

export default Wrapper
