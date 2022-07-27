/*
 * @Author: quan
 * @Date: 2022-07-26 15:04:54
 * @LastEditors: quan
 * @LastEditTime: 2022-07-26 17:01:38
 * @Description: file content
 */
import { addCommentResType } from "@/store/action/article";
import { CommentsListType } from "@/store/types";
import http from "@/utils/request";

type ReplyListParamsType = {
    type: 'a' | 'c',
    source: string,
    offset?: string
}
/**
 * 获取文章回复列表
 * @param commentId 评论id
 */
export const getReplyList = (commentId: string, offset?: string) => {
    return http.get<CommentsListType>('/comments', {
        params: {
            type: 'c',
            source: commentId,
            offset
        } as ReplyListParamsType
    })
}

// 请求返回类型
type AddReplyResType = {
    art_id: string,
} & addCommentResType
// 请求参数类型
type AddReply = {
    target: string,
    content: string,
    art_id: string
}
/**
 * 回复评论
 * @param comId 评论id  
 * @param content 回复内容
 * @param artId 文章id
 */
export const addReply = (comId: string, content: string, artId: string) => {
    return http.post<AddReplyResType>('/comments', {
            target: comId,
            content,
            art_id: artId
        } as AddReply
    )
}
