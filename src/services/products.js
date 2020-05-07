import { Api } from '../utils/http'

export const getProducts = (id = null) => {
    let appendId = id ? `/${id}` : ''
    return Api().get(`/products${appendId}`)
}
