/*
 * @Author: quan
 * @Date: 2022-07-04 15:33:42
 * @LastEditors: quan
 * @LastEditTime: 2022-07-15 09:39:50
 * @Description: file content
 */

import { ChannleType, ArticleListType, MoreActionType, HomeActionType } from '../types'

// 初始值类型
type HomeType = {
    userChannels: ChannleType[],
    allChannels: ChannleType[],
    articles: ArticleListType,
    moreAction: MoreActionType
}

// 设置初始值
const initVal: HomeType = {
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

export default function reducer(state = initVal, action: HomeActionType) {
    // let { type, payload } = action
    switch (action.type) {
        case 'home/saveChannel':
            return {
                ...state,
                userChannels: action.payload
            }
        case 'home/saveAllChannels':
            return {
                ...state,
                allChannels: action.payload
            }
        case 'home/saveArticleList' :
            const {channelId, timestamp, list, loadMore} = action.payload // 解析
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
        case 'home/setMoreAction': 
            return {
                ...state,
                moreAction: action.payload
            }
        default:
            break;
    }
    return state
}
