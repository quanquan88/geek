/*
 * @Author: quan
 * @Date: 2022-06-01 23:14:59
 * @LastEditors: quan
 * @LastEditTime: 2022-06-02 17:51:40
 * @Description: file content
 */
import axios from 'axios'
import { Toast } from "antd-mobile";
import {getTokenInfo} from "@/utils/storage";

// 1. 创建新的 axios 实例
const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 10000, // 超时时间
})

// 2. 设置请求拦截器
http.interceptors.request.use(config => {
  // 获取token
  const token = getTokenInfo().token
  if(token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})
// 3. 设置响应拦截器
http.interceptors.response.use(response => {
  return response.data
}, err => {
  if(err.response){
    Toast.info(err.response.data.message)
  }else {
    Toast.info('服务器繁忙，请稍后重试')
  }
  return Promise.reject(err)
})

// 4. 导出该 axios 实例
export default http