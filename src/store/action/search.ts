/*
 * @Author: quan
 * @Date: 2022-07-18 11:47:52
 * @LastEditors: quan
 * @LastEditTime: 2022-07-22 15:51:11
 * @Description: file content
 */
import http from "@/utils/request";
import { removeLocalHistories, setLocalHistories } from "@/utils/storage/searchHistory";
import { RootThunkAction } from "..";
import { ArticleType, SearchActionType } from "../types";

// 推荐搜索返回值类型
type SuggestionResultType = {
    options: string[]
}

// 请求 获取推荐搜索
export const getSuggestions = (payload: string): RootThunkAction => {
    return async (dispatch) => {
        const res = await http.get<SuggestionResultType>('/suggestion', { params: { q: payload } });
        console.log("----------推荐搜索----------", res.data);
        let options = res.data.options
        if(!options[0]) options = [];
        // 请求 储存
        dispatch(saveSuggestions(options));
    }
}

// 存储 推荐搜索
export const saveSuggestions = (payload: string[]): SearchActionType => {
    return {
        type: 'search/setSuggestions',
        payload
    }
}

// 清空 推荐搜索
export const clearSuggestions = (): SearchActionType => {
    return {
        type: 'search/clearSuggestions',
    }
}

// 添加历史记录
export const addSearchList = (keyword: string): RootThunkAction => {
    return async (dispatch, getState) => {
        // 1.获取原来的历史记录
        let histories: string[] =  getState().search.histories;
        // 2.删除重复记录
        histories = histories.filter(item => item !== keyword);
        // 3.添加记录
        histories = [keyword, ...histories];
        // 4.最大展示限制
        histories = histories.slice(0, 10);
        // 5.存储到redux
        dispatch(setHistories(histories))
        // 6.缓存
        setLocalHistories(histories);
    }
}

// 存储操作 历史记录
export const setHistories = (payload: string[]): SearchActionType => {
    return {
        type: 'search/setHistories',
        payload
    }
}

// 清空历史记录
export const clearSearchList = (): RootThunkAction => {
    return async (dispatch) => {
        // 1.清空redux
        dispatch(clearHistories());
        // 2.清空缓存
        removeLocalHistories();
    }
}
// 清空操作 历史记录
export const clearHistories = (): SearchActionType => {
    return {
        type: 'search/clearHistories'
    }
}


// 请求类型
type ResultResType = {
    page: number,
    per_page: number,
    results: ArticleType[],
    total_count: number,
    
}
// 获取搜索结果数据
export const getSearchResult = (keyword: string, page: number): RootThunkAction => {
    return async (dispatch) => {
        const res = await http.get<ResultResType>('/search', {params: {
            q: keyword,
            page,
            per_page: 10
        }});
        // console.log(res);

        // 存储redux
        dispatch(saveSearchResult(res.data.results));

        return res

        
    }
}
// 储存搜索结果
const saveSearchResult = (payload: ArticleType[]): SearchActionType => {
    return {
        type: 'search/saveSearchResult',
        payload
    }
}
