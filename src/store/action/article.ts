/*
 * @Author: quan
 * @Date: 2022-07-22 17:04:02
 * @LastEditors: quan
 * @LastEditTime: 2022-07-27 10:19:14
 * @Description: file content
 */

import http from "@/utils/request"
import { RootThunkAction } from ".."
import { ArtActionType, ArtDetailsType, CommentsListType, CommentType } from "../types";


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

// 请求-获取评论加载更多
export const getMoreCommentList = (artId: string, offset: string): RootThunkAction => {
    return async dispatch => {
        const res = await http.get<CommentsListType>('/comments', {
            params: {
                type: 'a',
                source: artId,
                offset
            }
        })
        console.log(res);
        // 储存
        dispatch(saveMoreComment(res.data))
    }
}
// 存储-评论加载更多
const saveMoreComment = (payload: CommentsListType): ArtActionType => {
    return {
        type: 'article/saveMoreComment',
        payload
    }
}

// 请求-点赞
export const likeArticle = (artId: string, attitude: number  ): RootThunkAction => {
    return async dispatch => {
        if(attitude === 1) {
            // 取消点赞
            await http.delete(`article/likings/${artId}`);
        } else {
            // 点赞
            await http.post('/article/likings', { target: artId });
        }

        // 更新数据
        dispatch(getArticleDetails(artId))
    }
}

// 请求-点击收藏
export const collectArticle = (artId: string, collect: boolean): RootThunkAction => {
    return async dispatch => {
        if(collect) {
            // 取消收藏
            await http.delete(`/article/collections/${artId}`)
        } else {
            // 收藏
            await http.post('/article/collections', { target: artId })
        }

        // 更新数据
        dispatch(getArticleDetails(artId))
    }
}

// 返回类型
export type addCommentResType = {
    com_id: string,
    new_obj: CommentType,
    target: string
}
// 请求-发表
export const addComment = (artId: string, content: string): RootThunkAction => {
    return async dispatch => {
        const res = await http.post<addCommentResType>('/comments', {
            target: artId,
            content
        })

        // console.log(res);
        dispatch(saveNewComment(res.data.new_obj))
        // 更新数据
        dispatch(getArticleDetails(artId))
    }
}
// 储存-发表的评论
const saveNewComment = (payload: CommentType): ArtActionType => {
    return {
        type: 'article/saveNewComment',
        payload
    }
}

// 修改-回复数量
export const updateComment = (payload: CommentType): ArtActionType => {
    return {
        type:'article/updateComment',
        payload
    }
}
