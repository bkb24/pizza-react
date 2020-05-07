import { Api } from '../utils/http'

export const getOrders = (id = null) => {
    let appendId = id ? `/${id}` : ''
    return Api().get(`/orders${appendId}`)
}

export const placeOrder = (data) => {
    return Api().post(`/orders`, data)
}

export const cancelOrder = (id) => {
    return Api().post(`/orders/${id}`, { _method: 'DELETE' })
}
