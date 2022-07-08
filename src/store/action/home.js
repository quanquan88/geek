/*
 * @Author: quan
 * @Date: 2022-07-04 11:53:58
 * @LastEditors: quan
 * @LastEditTime: 2022-07-04 16:57:30
 * @Description: file content
 */

import { getLocalChannels, setLocalChannels } from "@/utils/channelOp";
import http from "@/utils/request";
import { hasToken } from "@/utils/storage";
import { SAVE_CHANNEL } from "../action_type/home";


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
