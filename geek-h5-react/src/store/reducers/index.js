/*
 * @Author: quan
 * @Date: 2022-05-26 22:28:02
 * @LastEditors: quan
 * @LastEditTime: 2022-05-26 23:34:37
 * @Description: file content
 */
// 合并reducers方法
import { combineReducers } from "redux";
import login from './login'

export default combineReducers({
    login
})