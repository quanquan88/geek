/*
 * @Author: quan
 * @Date: 2022-07-18 10:36:25
 * @LastEditors: quan
 * @LastEditTime: 2022-07-22 14:18:27
 * @Description: file content
 */

import { SearchActionType, SearchInitType } from "../types";

const initVal: SearchInitType = {
    suggertions: [], // 推荐搜索
    histories: [], // 历史记录
    results: [], // 搜索结果
}

export default function reducer(state = initVal, action: SearchActionType) {
    if(action.type === 'search/setSuggestions') {
        return {
            ...state,
            suggertions: action.payload
        }
    }
    if(action.type === 'search/clearSuggestions') {
        return {
            ...state,
            suggertions: []
        }
    }
    if(action.type === 'search/setHistories') {
        return {
            ...state,
            histories: action.payload
        }
    }
    if(action.type === 'search/clearHistories') {
        return {
            ...state,
            histories: []
        }
    }
    if(action.type === 'search/saveSearchResult') {
        return {
            ...state,
            results: action.payload
        }
    }
    return state;
}
