/*
 * @Author: quan
 * @Date: 2022-07-21 14:17:53
 * @LastEditors: quan
 * @LastEditTime: 2022-07-21 15:16:14
 * @Description: file content
 */

// 搜索关键字的本地缓存键名
const SEARCH_HIS_KEY = 'itcast_history_k'

/**
 * 从缓存获取搜索历史关键字
 */
export const getLocalHistories = (): string[] => {
  return JSON.parse(localStorage.getItem(SEARCH_HIS_KEY)!) || []
}

/**
 * 将搜索历史关键字存入本地缓存
 * @param {Array} histories 
 */
export const setLocalHistories = (histories: string[]): void => {
  localStorage.setItem(SEARCH_HIS_KEY, JSON.stringify(histories))
}

/**
 * 删除本地缓存中的搜索历史关键字
 */
export const removeLocalHistories = (): void => {
  localStorage.removeItem(SEARCH_HIS_KEY)
}
