/*
 * @Author: quan
 * @Date: 2022-07-14 14:20:08
 * @LastEditors: quan
 * @LastEditTime: 2022-07-15 14:28:27
 * @Description: file content
 */
// user类型
export type UserType = {
    id: string,
    name: string,
    photo: string,
    art_count: number,
    follow_count: number,
    fans_count: number,
    like_count: number
}
// profile类型
export type ProfileType = {
    id: string,
    photo: string,
    name: string,
    mobile: string,
    gender: number,
    birthday: string
}

// action类型
export type ActionType = {
    type: "profile/user",
    payload: UserType
} | {
    type: "profile/profile",
    payload: ProfileType
}

// 频道类型
export type ChannleType = {
    id: number,
    name: string
}
// 投诉类型
export type MoreActionType = {
    visible: boolean,
    articleId: string,
    channelId: number
}
// 文章类型
export type ArticleType = {
    art_id: string,
    title: string,
    aut_id: string,
    aut_name: string,
    comm_count: string,
    cover: {
        type: string,
        images: string[]
    },
    
}
// 文章列表类型
export type ArticleListType = {
    [index: number]: {
        timestamp: string,
        list: ArticleType[]
    }
}
// 首页action类型
export type HomeActionType = {
    type: 'home/saveChannel',
    payload: ChannleType[]
} | {
    type: 'home/saveAllChannels',
    payload: ChannleType[]
} | {
    type: 'home/saveArticleList',
    payload: {
        channelId: number,
        timestamp: string,
        list: ArticleType[],
        loadMore: boolean
    }
} | {
    type: 'home/setMoreAction',
    payload: MoreActionType
}
