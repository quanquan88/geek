/*
 * @Author: quan
 * @Date: 2022-06-01 23:16:38
 * @LastEditors: quan
 * @LastEditTime: 2022-06-02 08:45:42
 * @Description: file content
 */

// 请求
import http from "@/utils/request";
// 缓存token
import {removeTokenInfo, setTokenInfo} from "@/utils/storage";

// 获取验证码
export const sendValidationCode = (mobile) => {
    return dispatch => {
        return http.get(`/sms/codes/${mobile}`)
    }
}

// 登录
export const login = (data) => {
    return async dispatch => {
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
const saveToken = (payLoad) => {
    return {
        type: 'login/token',
        payLoad
    }
}

// 退出登录
export const removeToken = () => {
    return dispatch => {
        // 清除redux的token
        dispatch(saveToken({}))
        // 清除本地的token
        removeTokenInfo()
    }
}

