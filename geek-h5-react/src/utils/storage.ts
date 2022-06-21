// 用户 Token 的本地缓存键名
import {boolean} from "yup";

const TOKEN_KEY = 'geek-itcast-token'

// 定义token对象类型
type Token = {
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