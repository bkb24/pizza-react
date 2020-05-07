import axios from 'axios'

const baseURL = 'http://pizza.test'

export const Api = () => {
    return axios.create({
        baseURL: baseURL + '/api',
        headers: {
            'X-CSRF-TOKEN'    : window.csrfToken,
            'X-Requested-With': 'XMLHttpRequest',
        }
    })
}

export const Http = () => {
    return axios.create({
        baseURL,
        headers: {
            'X-CSRF-TOKEN'    : window.csrfToken,
            'X-Requested-With': 'XMLHttpRequest',
        }
    })
}

export const HttpMultipart = () => {
    return axios.create({
        baseURL,
        headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRF-TOKEN'    : window.csrfToken,
            'X-Requested-With': 'XMLHttpRequest',
        },
    })
}
