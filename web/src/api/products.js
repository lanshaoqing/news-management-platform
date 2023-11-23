import axios from 'axios'

// 获取产品列表
export const getProductsList = async () => {
    return axios.get('/webapi/products/list')
}