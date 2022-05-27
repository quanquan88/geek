/*
 * @Author: quan
 * @Date: 2022-05-26 22:28:02
 * @LastEditors: quan
 * @LastEditTime: 2022-05-26 23:34:37
 * @Description: file content
 */
// 合并reducers方法
import { combineReducers } from "redux";

const user = (preState = '小飞', action) => {
    return preState
}

export default combineReducers({
    user
})