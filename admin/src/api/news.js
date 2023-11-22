import axios from 'axios'

// 获取新闻列表信息
export const getNewsList = () => {
    return axios.get('/adminapi/news/list')
}

// 更新发布状态
export const updatePublish = (data) => {
    return axios.put('/adminapi/news/publish',{
        id:data.id,
        isPublish:data.isPublish
    })
}
export const deleteNews = (data)=>{
    return axios.delete(`/adminapi/news/list/${data.id}`)
}