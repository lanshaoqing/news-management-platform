import axios from 'axios'
// 登录
export const login = (loginForm) => {
    return axios.post('/adminapi/user/login', loginForm)
}

// 更新formData信息
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

// 获取用户列表信息
export const getUserList = () => {
    return axios.get('/adminapi/user/list')
}

// 删除用户
export const deleteUser = (id) => {
    return axios.delete(`/adminapi/user/list/${id}`)
}

// 编辑用户
export const editUser = (userForm) => {
    return axios.put(`/adminapi/user/list/${userForm.id}`, userForm)
}

// 获取用户信息
export const getUserInfo = (id) => {
    return axios.get(`/adminapi/user/info/${id}`)
}