/*
 * @Author: quan
 * @Date: 2022-07-04 11:53:58
 * @LastEditors: quan
 * @LastEditTime: 2022-07-11 14:44:48
 * @Description: file content
 */

import { getLocalChannels, setLocalChannels } from "@/utils/channelOp";
import http from "@/utils/request";
import { hasToken } from "@/utils/storage";
import { SAVE_CHANNEL, SAVE_ALL_CHANNEL } from "../action_type/home";


// 获取用户频道
export const getUserChannels = () => {
    return async dispathch => {
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
export const savaUserChannel = payload => {
    return {
        type: SAVE_CHANNEL,
        payload
    }
}

// 删除用户频道
export const removeChannel = channel => {
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
export const getAllChannels = () => {
    return async dispathch => {
        const res = await http.get('/channels')
        // console.log(res);
        dispathch(saveAllChannels(res.data.channels))
    }
}

// 保存全部频道
export const saveAllChannels = payload => {
    return {
        type: SAVE_ALL_CHANNEL,
        payload
    }
}

// 添加频道
export const addChannel = channel => {
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
