/*
 * @Author: quan
 * @Date: 2022-07-18 10:36:25
 * @LastEditors: quan
 * @LastEditTime: 2022-07-18 10:53:08
 * @Description: file content
 */

import { SearchActionType, SearchInitType } from "../types";

const initVal: SearchInitType = {
    suggertions: [], // 推荐搜索
    
}

export default function reducer(state = initVal, action: SearchActionType) {
    if(action.type === 'search/setSuggestions') {
        return {
            ...state,
            suggertions: action.payload
        }
    }
    return state;
}
