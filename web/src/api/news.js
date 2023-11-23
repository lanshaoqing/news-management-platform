import axios from 'axios'

export const getNewsList = () => {
    return axios.get('/webapi/news/list')
}