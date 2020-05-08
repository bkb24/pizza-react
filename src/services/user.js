import { Api, Http } from '../utils/http'

export const getUser = () => {
    return Api().get(`/user`)
}

export const savePhone = (phone) => {
    return Api().post(`/users/current/phone`, { phone })
}

export const saveAddress = (address) => {
    return Api().post(`/users/current/address`, { address })
}

export const saveCurrency = (currency) => {
    return Api().post(`/users/current/currency`, { currency })
}

export const logout = () => {
    return Http().post(`/logout`)
}
