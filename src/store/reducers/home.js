/*
 * @Author: quan
 * @Date: 2022-07-04 15:33:42
 * @LastEditors: quan
 * @LastEditTime: 2022-07-04 15:40:40
 * @Description: file content
 */

import {SAVE_CHANNEL} from '../action_type/home'

// 设置初始值
const initVal = {
    userChannels: []
}

export default function reducer(state = initVal, action) {
    let { type, payload } = action
    switch (type) {
        case SAVE_CHANNEL:
            return {
                ...state,
                userChannels: payload
            }
        default:
            break;
    }
    return state
}
