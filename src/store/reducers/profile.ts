/*
 * @Author: quan
 * @Date: 2022-07-08 11:02:13
 * @LastEditors: quan
 * @LastEditTime: 2022-07-14 15:11:13
 * @Description: file content
 */

import {UserType, ProfileType, ActionType} from '@/store/types'

// 初始值类型
export interface ProfileInitType {
    user: UserType,
    profile: ProfileType
}


const initVal: ProfileInitType = {
    user: {}, // 我的信息
    profile: {} // 编辑信息
} as ProfileInitType; // 断言

export default function reducer(prestate = initVal, action: ActionType){

    // const { type, payload } = action

    if(action.type === "profile/user"){
        return {
            ...prestate,
            user: action.payload
        }
    }
    if(action.type === "profile/profile"){
        return {
            ...prestate,
            profile: action.payload
        }
    }
    return prestate
}