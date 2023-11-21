import axios from 'axios'

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`

    return config
}, function (error) {

    return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
    const { authorization } = response.headers
    authorization && localStorage.setItem('token', authorization)

    return response
}, function (error) {
    if(error.response.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '#/login'
    }

    return Promise.reject(error)
})