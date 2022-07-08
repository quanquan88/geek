/*
 * @Author: quan
 * @Date: 2022-07-04 15:33:42
 * @LastEditors: quan
 * @LastEditTime: 2022-07-08 11:57:09
 * @Description: file content
 */

import {SAVE_CHANNEL,SAVE_ALL_CHANNEL} from '../action_type/home'

// 设置初始值
const initVal = {
    userChannels: [], //用户的频道
    allChannels: [], //全部频道
}

export default function reducer(state = initVal, action) {
    let { type, payload } = action
    switch (type) {
        case SAVE_CHANNEL:
            return {
                ...state,
                userChannels: payload
            }
        case SAVE_ALL_CHANNEL:
            return {
                ...state,
                allChannels: payload
            }
        default:
            break;
    }
    return state
}
