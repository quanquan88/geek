/*
 * @Author: quan
 * @Date: 2022-07-22 17:04:02
 * @LastEditors: quan
 * @LastEditTime: 2022-07-22 17:28:57
 * @Description: file content
 */

import http from "@/utils/request"
import { RootThunkAction } from ".."
import { ArtActionType, ArtDetailsType } from "../types";


// 请求-获取文章详情
export const getArticleDetails = (id: string): RootThunkAction => {
    return async (dispatch) => {
        const res = await http.get<ArtDetailsType>(`/articles/${id}`);
        // console.log(res);
        // 存储redux
        dispatch(saveArticleDetails(res.data))
    }
}
// 存储-文章详情
export const saveArticleDetails = (payload: ArtDetailsType): ArtActionType => {
    return {    
        type: 'article/saveArticleDetails',
        payload
    }
}
