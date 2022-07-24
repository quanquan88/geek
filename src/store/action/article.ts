/*
 * @Author: quan
 * @Date: 2022-07-22 17:04:02
 * @LastEditors: quan
 * @LastEditTime: 2022-07-23 21:44:54
 * @Description: file content
 */

import http from "@/utils/request"
import { RootThunkAction } from ".."
import { ArtActionType, ArtDetailsType, CommentsListType } from "../types";


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

// 请求-获取评论数据
export const getCommentList = (artId: string): RootThunkAction => {
    return async dispatch => {
        const res = await http.get<CommentsListType>('/comments', { params: {
            type: 'a',
            source: artId
        } })

        // console.log(res);
        // 存储
        dispatch(saveComments(res.data));
        
    }
}
// 储存-评论数据
const saveComments = (payload: CommentsListType): ArtActionType => {
    return {
        type: 'article/saveComment',
        payload
    }
}
