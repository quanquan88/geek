/*
 * @Author: quan
 * @Date: 2022-06-01 23:14:59
 * @LastEditors: quan
 * @LastEditTime: 2022-07-24 20:55:19
 * @Description: file content
 */
import axios, {AxiosError} from 'axios'
import {Toast} from "antd-mobile";
import {getTokenInfo, setTokenInfo} from "@/utils/storage";
// 路由跳转
import history from "@/utils/history";
import store from "@/store";
import {saveToken} from "@/store/action/login";

// 根地址
export const baseURL = 'http://geek.itheima.net/v1_0';

// 1. 创建新的 axios 实例
const http = axios.create({
    baseURL,
    timeout: 10000, // 超时时间
})

// 2. 设置请求拦截器
http.interceptors.request.use(config => {
    // 获取token
    const token = getTokenInfo().token
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
})
// 3. 设置响应拦截器
http.interceptors.response.use(response => {
    return response.data
}, async (err: AxiosError<{message: string}>)  => {
    // 网络问题
    if (!err.response) {
        Toast.info('服务器繁忙，请稍后重试')
        return Promise.reject(err)
    }
    // 无感刷新token
    if (err.response.status === 401) {
        // @ts-ignore
        // @ts-ignore
        try {
            const res = await axios({
                method: 'put',
                url: baseURL + '/authorizations',
                headers: {
                    Authorization: `Base ${getTokenInfo().refresh_token}`
                }
            })
            // 最新token信息
            const tokenInfo = {
                token: res.data.data.token,
                refresh_token: getTokenInfo().refresh_token
            }
            // 存储redux
            store.dispatch(saveToken(tokenInfo))
            // 存储缓存
            setTokenInfo(tokenInfo)

            // 重新发起请求
            return http(err.response.config)
        } catch(err: any) {
            console.log(err.response)
            // token过期
            if(err.response.status === 500 && err.response.data.message === "refresh_token失效") {
                Toast.info('登录过期', 1)
                history.replace({
                    pathname: '/login',
                    state: {
                        from: history.location.pathname
                    }
                })
                return Promise.reject(err)
            }
        }

    }
    return Promise.reject(err)
})

// 4. 导出该 axios 实例
export default http