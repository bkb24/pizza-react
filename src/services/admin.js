import { Api, HttpMultipart } from '../utils/http'

export const getCategories = () => {
    return Api().get(`/admin/products/categories`)
}

// Products
export const getProducts = () => {
    return Api().get(`/admin/products`)
}

export const getProduct = (id) => {
    return Api().get(`/admin/products/${id}`)
}

export const deleteProduct = (id) => {
    return Api().post(`/admin/products/${id}`, { _method: 'DELETE' })
}

export const saveProduct = (id = null, data) => {
    let param = id ? `/${id}` : ''
    return HttpMultipart().post(`/api/admin/products${param}`, data)
}

// Users
export const getAllUsers = () => {
    return Api().get(`/admin/users`)
}

export const getAUser = (id) => {
    return Api().get(`/admin/users/${id}`)
}

export const getRoles = () => {
    return Api().get(`/admin/roles`)
}

export const addUserARole = (userId, roleSlug) => {
    return Api().post(`/admin/users/${userId}/roles`, { role: roleSlug })
}

export const removeUserRole = (userId, roleSlug) => {
    return Api().post(`/admin/users/${userId}/roles/${roleSlug}`, { _method: 'DELETE' })
}

// Orders
export const getOrders = (id = null) => {
    let appendId = id ? `/${id}` : ''
    return Api().get(`/admin/orders${appendId}`)
}

export const getUserOrders = (userId) => {
    return Api().get(`/admin/users/${userId}/orders`)
}

export const confirmOrder = (id) => {
    return Api().post(`/admin/orders/${id}/confirm`)
}

export const cancelOrder = (id) => {
    return Api().post(`/admin/orders/${id}/cancel`, { _method: 'DELETE' })
}
