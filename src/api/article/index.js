/*
 * @Author: quan
 * @Date: 2022-07-11 17:31:26
 * @LastEditors: quan
 * @LastEditTime: 2022-07-11 17:33:31
 * @Description: file content
 */
import http from "@/utils/request";

/** 首页 */

// 获取文章列表
export const artList = params => {
    return http.get('/articles', { params });
}