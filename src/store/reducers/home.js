/*
 * @Author: quan
 * @Date: 2022-07-04 15:33:42
 * @LastEditors: quan
 * @LastEditTime: 2022-07-13 15:53:46
 * @Description: file content
 */

import {SAVE_CHANNEL,SAVE_ALL_CHANNEL, SAVE_ART_LIST, SET_MORE_ACTION} from '../action_type/home'

// 设置初始值
const initVal = {
    userChannels: [], //用户的频道
    allChannels: [], //全部频道
    articles: {}, // all的文章列表
    // 投诉弹框
    moreAction: {
        visible: false, // 状态
        articleId: '', // 文章id
        channelId: 0, // 频道id
    }
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
        case SAVE_ART_LIST :
            const {channelId, timestamp, list, loadMore} = payload // 解析
            const oldList = state.articles[channelId]?.list // 旧数据
            return {
                ...state,
                articles: {
                    ...state.articles,
                    [channelId]: {
                        timestamp: timestamp,
                        list: loadMore ? [...oldList, ...list] : list
                    }
                }
            }
        case SET_MORE_ACTION: 
            return {
                ...state,
                moreAction: payload
            }
        default:
            break;
    }
    return state
}
