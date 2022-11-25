import { $authHost, $host } from './index'
import jwt_decode from 'jwt-decode'

export const check = async () => {
    const { data } = await $authHost.get('api/user/check')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const getInfo = async () => {
    const { data } = await $authHost.get('api/user/getInfo')
    return data
}

export const saveUserBio = async (bio) => {
    const { data } = await $authHost.post('api/user/saveBio', { bio })
    return data
}

export const changeUserAvatar = async (info) => {
    const { data } = await $authHost.post('api/user/changeAvatar', info)
    return data
}

export const changeUsername = async (username) => {
    const { data } = await $authHost.post('api/user/changeUsername', { username })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const getLayerInfo = async (username) => {
    const { data } = await $host.get('api/user/' + username)
    return data
}

export const addLink = async (title, link) => {
    const { data } = await $authHost.post('api/user/addLink', { title, link })
    return data
}

export const deleteLink = async (id) => {
    const { data } = await $authHost.post('api/user/deleteLink', { id })
    return data
}

export const editLink = async (id, title, link) => {
    const { data } = await $authHost.post('api/user/editLink', { id, title, link })
    return data
}

export const getConnections = async () => {
    const { data } = await $authHost.get('api/user/getConnections')
    return data
}

export const setMailing = async (status) => {
    const { data } = await $authHost.post('api/user/setMailing', { status })
    return data
}

export const setEmail = async (email) => {
    const { data } = await $authHost.post('api/user/setEmail', { email })
    return data
}

// oAuth API
export const GoogleOAuth = async (email, googleId) => {
    const { data } = await $host.post('api/user/GoogleAuth', { email, googleId })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const GithubOAuth = async (code) => {
    const { data } = await $host.post('api/user/GithubAuth', { code })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}


// Connect API

export const GithubConnect = async (code) => {
    const { data } = await $authHost.post('api/user/GithubConnect', { code })
    return data
}

export const GoogleConnect = async (email, googleId) => {
    const { data } = await $authHost.post('api/user/GoogleConnect', { email, googleId })
    return data
}

// Delete API

export const deleteConnect = async (api) => {
    const { data } = await $authHost.post('api/user/deleteConnect', { api })
    return data
}