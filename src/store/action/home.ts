/*
 * @Author: quan
 * @Date: 2022-07-04 11:53:58
 * @LastEditors: quan
 * @LastEditTime: 2022-07-18 10:17:17
 * @Description: file content
 */

import { getLocalChannels, setLocalChannels } from "@/utils/channelOp";
import http from "@/utils/request";
import { hasToken } from "@/utils/storage";
import {ArticleType, ChannleType, HomeActionType, MoreActionType} from '@/store/types'
import { RootThunkAction } from "@/store";
import { Dispatch } from "redux";


// 获取用户频道
export const getUserChannels = (): RootThunkAction => {
    return async (dispathch) => {
        // 1.判断用户是否登录
        if(hasToken()) {
            const res = await http.get('/user/channels')
            // 保存redux
            dispathch(savaUserChannel(res.data.channels))
        } else {
            // 未登录
            const channels = getLocalChannels();
            
            // 2.本地有缓存数据
            if(channels) {
                dispathch(savaUserChannel(channels));
            } else {
                // 3.无缓存
                const res = await http.get('/user/channels');
                // 保存redux
                dispathch(savaUserChannel(res.data.channels));
                // 保存到缓存
                setLocalChannels(res.data.channels);
            }
        }
    }
}

// 存储频道的action
export const savaUserChannel = (payload: ChannleType[]): HomeActionType => {
    return {
        type: 'home/saveChannel',
        payload
    }
}

// 删除用户频道
export const removeChannel = (channel: ChannleType): RootThunkAction => {
    return async (dispathch, getState) => {

        const {userChannels} = getState().home
        // 1.已登录，发送请求删除
        if(hasToken()) {
            // 删除请求
            await http.delete(`/user/channels/${channel.id}`)
            // 修改redux的数据
            dispathch(savaUserChannel(userChannels.filter(item => item.id !== channel.id)))
        } else {
            // 2.没有登录 修改本地和redux
            const result = userChannels.filter(item => item.id !== channel.id);
            // 修改redux
            dispathch(savaUserChannel(result));
            // 修改缓存数据
            setLocalChannels(result);
        }
    }
}

// 获取全部频道
export const getAllChannels = (): RootThunkAction => {
    return async (dispathch) => {
        const res = await http.get('/channels')
        // console.log(res);
        dispathch(saveAllChannels(res.data.channels))
    }
}

// 保存全部频道
export const saveAllChannels = (payload: ChannleType[]): HomeActionType => {
    return {
        type: 'home/saveAllChannels',
        payload
    }
}

// 添加频道
export const addChannel = (channel: ChannleType): RootThunkAction => {
    return async (dispathch, getState) => {
        // 获取用户频道
        const { userChannels } = getState().home
        // 存储的数据
        const channelsData = [...userChannels, channel] 

        // 1.已登录状态 发起请求
        if(hasToken()) {
            await http.patch('/user/channels', {
                channels: [channel],
            })
            
            dispathch(savaUserChannel(channelsData))
            
        } else {
            // 2.没有登录缓存
            // 修改redux
            dispathch(savaUserChannel(channelsData))
            // 修改缓存
            setLocalChannels(channelsData)
        }
    }
}

// 获取文章列表
export const getArtList = (channelId: number, timestamp: string, loadMore: boolean = false) => {
    return async (dispathch: Dispatch) => {
        const res = await http.get('/articles', {
            params: {
                channel_id: channelId,
                timestamp
            }
        })
        // console.log(res);
        dispathch(
            setArtList({
                channelId,
                timestamp: res.data.pre_timestamp,
                list: res.data.results,
                loadMore
            })
        )
        return res
    }
}

type SetArtListType = {
    channelId: number,
    timestamp: string,
    list: ArticleType[],
    loadMore: boolean
}

// 储存文章列表
export const setArtList = (payload: SetArtListType): HomeActionType => {
    return {
        type: 'home/saveArticleList',
        payload
    }
}

// 设置投诉操作
export const setMoreAction = (payload: MoreActionType): HomeActionType => {
    return {
        type: 'home/setMoreAction',
        payload
    }
}

// 请求不感兴趣
export const unlinkArticle = (artId: string): RootThunkAction => {
    return async (dispathch, getState) => {
        await http.post('/article/dislikes', { target: artId })
        // 频道id
        const {channelId} = getState().home.moreAction;
        // 文章信息
        const artInfo = getState().home.articles[channelId];

        // 存储文章列表
        dispathch(
            setArtList({
                ...artInfo,
                channelId,
                loadMore: false,
                list: artInfo.list?.filter(item => item.art_id !== artId)
            })
        )
    }
}

// 请求举报
export const reportArticle = (artId: string, reportId: number): RootThunkAction => {
    return async (dispathch, getState) => {
        await http.post('/article/reports', {
            target: artId,
            type: reportId
        })

        // 频道id
        const {channelId} = getState().home.moreAction;
        // 文章信息
        const artInfo = getState().home.articles[channelId];

        // 存储文章列表
        dispathch(
            setArtList({
                ...artInfo,
                channelId,
                loadMore: false,
                list: artInfo.list?.filter(item => item.art_id !== artId)
            })
        )
    }
}
