import { $authHost, $host } from './index'

export const createMessage = async (to, body) => {
    const { data } = await $authHost.post('api/message/createMessage', { to, body })
    return data
}

export const getMessages = async () => {
    const { data } = await $authHost.get('api/message/getMessages')
    return data
}

export const deleteMessage = async (id) => {
    const { data } = await $authHost.post('api/message/deleteMessage', { id })
    return data
}

export const starredMessage = async (id) => {
    const { data } = await $authHost.post('api/message/starredMessage', { id })
    return data
}

export const readMessage = async (id) => {
    const { data } = await $authHost.post('api/message/readMessage', { id })
    return data
}

export const createUnauthMessage = async (from, to, body) => {
    const { data } = await $authHost.post('api/message/createUnauthMessage', { from, to, body })
    return data
}