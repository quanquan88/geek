/*
 * @Author: quan
 * @Date: 2022-07-04 16:28:45
 * @LastEditors: quan
 * @LastEditTime: 2022-07-04 16:59:07
 * @Description: file content
 */


const CHANNEL_KEY = "geek-itcast-channels";

// channels的类型
type channels = {
    id: number,
    name: string
}[]

// 缓存频道数据
export const setLocalChannels = (channels: channels): void => {
    localStorage.setItem(CHANNEL_KEY, JSON.stringify(channels));
}

// 获取缓存中的频道数据
export const getLocalChannels = (): channels => {
    return JSON.parse(localStorage.getItem(CHANNEL_KEY)!);
}

// 删除缓存中的频道数据
export const removeLocalChannels = (): void => {
    localStorage.removeItem(CHANNEL_KEY);
}
