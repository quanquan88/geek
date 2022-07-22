
/*
* @Author: quan
* @Date: 2022-07-22 16:48:51
 * @LastEditors: quan
 * @LastEditTime: 2022-07-22 17:25:12
* @Description: file content
*/

import { ArtActionType, ArticleInitType } from "../types";

const initState: ArticleInitType = {
  // 文章加载中的标识
  isLoading: true,
  // 文章详情数据
  info: {},
} as ArticleInitType;

export default function reducers(state = initState, action: ArtActionType) {
	if(action.type === 'article/saveArticleDetails') {
		return {
			...state,
			info: action.payload
		}
	}
	return state
}
