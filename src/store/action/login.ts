/*
 * @Author: quan
 * @Date: 2022-06-01 23:16:38
 * @LastEditors: quan
 * @LastEditTime: 2022-07-14 09:46:20
 * @Description: file content
 */

// 请求
import http from "@/utils/request";
// 缓存token
import {removeTokenInfo, setTokenInfo, Token} from "@/utils/storage";
import {Dispatch} from 'redux'

// 登录的类型
type Login = {
    mobile: string,
    code: string
}

// 获取验证码
export const sendValidationCode = (mobile: string) => {
    return () => {
        return http.get(`/sms/codes/${mobile}`)
    }
}

// 登录
export const login = (data: Login) => {
    return async (dispatch: Dispatch) => {
        const res = await http.post('/authorizations', data)
        // console.log(res);
        // 存储到redux
        dispatch(saveToken(res.data))
        // 存储到缓存
        setTokenInfo(res.data)
        return res
    }
}

// 储存token
export const saveToken = (payLoad: Token) => {
    return {
        type: 'login/token',
        payLoad
    }
}

// 退出登录
export const removeToken = () => {
    return (dispatch: Dispatch) => {
        // 清除redux的token
        dispatch(saveToken({token: '', refresh_token: ''}))
        // 清除本地的token
        removeTokenInfo()
    }
}

