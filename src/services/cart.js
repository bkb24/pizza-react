import { Api } from '../utils/http'

export const getCart = () => {
    return Api().get(`/cart`)
}

export const addItemToCart = (id, quantity) => {
    return Api().post(`/cart/products/${id}`, { quantity })
}

export const removeItemFromCart = (id) => {
    return Api().post(`/cart/products/${id}`, { _method: 'DELETE' })
}

export const flushCart = (id) => {
    return Api().post(`/cart`, { _method: 'DELETE' })
}
