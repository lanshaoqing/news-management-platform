import axios from 'axios'

export const getNewsList = () => {
    return axios.get('/webapi/news/list')
}

export const getNewsInfo = (data) => {
    return axios.get(`/webapi/news/list/${data.id}`)
}

export const getTopList = () => {
    return axios.get('/webapi/news/toplist?limit=4')
}