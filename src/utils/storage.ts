/*
 * @Author: quan
 * @Date: 2022-07-04 11:21:08
 * @LastEditors: quan
 * @LastEditTime: 2022-07-13 17:53:19
 * @Description: file content
 */
// 用户 Token 的本地缓存键名

const TOKEN_KEY = 'geek-itcast-token'

// 定义token对象类型
export type Token = {
    token: string,
    refresh_token: string
}

/**
 * 从本地缓存中获取 Token 信息
 */
export const getTokenInfo = (): Token => {
    // ! 非空断言
    return JSON.parse(localStorage.getItem(TOKEN_KEY)!) || { token: '', refresh_token: '' }
}

/**
 * 将 Token 信息存入缓存
 * @param {Object} tokenInfo 从后端获取到的 Token 信息
 */
export const setTokenInfo = (tokenInfo: Token): void => {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenInfo))
}

/**
 * 删除本地缓存中的 Token 信息
 */
export const removeTokenInfo = (): void => {
    localStorage.removeItem(TOKEN_KEY)
}

/**
 * 判断本地缓存中是否存在 Token 信息
 */
export const hasToken = (): boolean => {
    return !!getTokenInfo().token
}