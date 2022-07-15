/*
 * @Author: quan
 * @Date: 2022-05-26 22:28:02
 * @LastEditors: quan
 * @LastEditTime: 2022-07-04 15:35:12
 * @Description: file content
 */
// 合并reducers方法
import { combineReducers } from "redux";
import login from './login'
import profile from "./profile";
import home from './home'

export default combineReducers({
    login,
    profile,
    home
})