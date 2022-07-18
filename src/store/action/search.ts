/*
 * @Author: quan
 * @Date: 2022-07-18 11:47:52
 * @LastEditors: quan
 * @LastEditTime: 2022-07-18 15:16:43
 * @Description: file content
 */
import http from "@/utils/request";
import { RootThunkAction } from "..";
import { SearchActionType } from "../types";

// 推荐搜索返回值类型
type SuggestionResultType = {
    options: string[]
}

// 请求 获取推荐搜索
export const getSuggestions = (payload: string): RootThunkAction => {
    return async (dispatch) => {
        const res = await http.get<SuggestionResultType>('/suggestion', { params: { q: payload } })
        console.log("----------推荐搜索----------", res.data);
        // 请求 储存
        dispatch(saveSuggestions(res.data.options));
    }
}

// 存储 推荐搜索
export const saveSuggestions = (payload: string[]): SearchActionType => {
    return {
        type: 'search/setSuggestions',
        payload
    }
}
