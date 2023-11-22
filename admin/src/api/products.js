import axios from 'axios'

// 获取产品列表信息
export const getProductsList = () => {
    return axios.get('adminapi/products/list')
}

// 删除产品信息
export const deleteProducts = (data) => {
    return axios.delete(`adminapi/products/list/${data.id}`)
}

// 获取产品信息
export const getProductInfo = (data) => {
    return axios.get(`/adminapi/products/info/${data.id}`)
}