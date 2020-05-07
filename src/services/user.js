import { Api } from '../utils/http'

export const getUser = () => {
    return Api().get(`/user`)
}

export const savePhone = (phone) => {
    return Api().post(`/users/current/phone`, { phone })
}

export const saveAddress = (address) => {
    return Api().post(`/users/current/address`, { address })
}
