/*
 * @Author: quan
 * @Date: 2022-07-14 14:20:08
 * @LastEditors: quan
 * @LastEditTime: 2022-07-26 11:46:40
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


// 搜索初始类型
export type SearchInitType = {
    suggertions: string[],
    histories: string[],
    results: ArticleType[]
}

// 搜索页的action
export type SearchActionType = {
    type: 'search/setSuggestions',
    payload: string[]
} | {
    type: 'search/clearSuggestions',
} | {
    type: 'search/setHistories',
    payload: string[]
} | {
    type: 'search/clearHistories'
} | {
    type: 'search/saveSearchResult',
    payload: ArticleType[]
}


// 文章详情类型
export type ArtDetailsType = {
    art_id: string,
    attitude: number,
    aut_id: string,
    aut_name: string,
    aut_photo: string,
    comm_count: number,
    content: string,
    is_collected: boolean,
    is_followed: boolean,
    like_count: number,
    pubdate: string,
    read_count: number,
    title: string
}
// 文章详情初始类型
export type ArticleInitType = {
    isLoading: boolean,
    info: ArtDetailsType,
    comments: CommentsListType
}
// 文章action类型
export type ArtActionType = {
    type: 'article/saveArticleDetails',
    payload: ArtDetailsType
} | {
    type: 'article/saveComment',
    payload: CommentsListType
} | {
    type: 'article/saveMoreComment',
    payload: CommentsListType
} | {
    type: 'article/saveNewComment',
    payload: CommentType
}
// 评论消息类型
type CommentType = {
    aut_id: string;
    aut_name: string;
    aut_photo: string;
    com_id: string;
    content: string;
    is_followed: boolean;
    is_liking: boolean;
    like_count: number;
    pubdate: string;
    reply_count: number;
}
// 评论列表类型
type CommentsListType = {
    end_id: string,
    last_id: string,
    total_count: number,
    results: CommentType[]
}

