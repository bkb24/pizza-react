import React, { useState, useEffect } from 'react'
import StoreContext from './store-context'
import { getUser } from '../services/user'
import { addItemToCart, removeItemFromCart, flushCart } from '../services/cart'
import { inCart } from '../utils/products'

const Wrapper = props => {
    // const rates = window.appData ? window.appData.rates : {}
    // const isAdmin = window.appData ? window.appData.isAdmin : false
    // const isManager = window.appData ? window.appData.isManager : false
    // const cartState = window.appData ? window.appData.cart : []
    const [user, setUser] = useState({})
    const [currency, setCurrency] = useState('EUR')
    const [loaded, setLoaded] = useState(false)
    const [rates, setRates] = useState({})
    const [isAdmin, setIsAdmin] = useState(false)
    const [isManager, setIsManager] = useState(false)
    const [cart, setCart] = useState([])

    useEffect(() => {
        getUser()
            .then(response => {
                let {
                    rates,
                    currency,
                    isAdmin,
                    isManager,
                    cart,
                    csrfToken
                } = response.data.appData

                window.csrfToken = csrfToken

                setUser(response.data.appData.user)
                setCurrency(currency)
                setRates(rates)
                setIsAdmin(isAdmin)
                setIsManager(isManager)
                setCart(cart)
                setLoaded(true)
            })
    }, [])

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
                loaded,
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
