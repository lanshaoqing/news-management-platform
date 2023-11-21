import axios from 'axios'
// 更新formData信息,图片信息
export const upload = (path, userForm) => {
    const params = new FormData()
    for (let i in userForm) {
        params.append(i, userForm[i])
    }
    return axios.post(
        path,
        params,
        { headers: { 'Content-Type': 'multipart/form-Data' } }
    )
}