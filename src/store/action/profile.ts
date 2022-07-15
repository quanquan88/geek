/*
 * @Author: quan
 * @Date: 2022-07-04 11:21:08
 * @LastEditors: quan
 * @LastEditTime: 2022-07-14 15:06:55
 * @Description: file content
 */
import http from "@/utils/request";
// 常量
import { Dispatch } from "redux";
import { UserType, ProfileType, ActionType } from "../types";

// 储存用户信息函数类型
type SavaUserType = (payload: UserType) => ActionType;

// 储存用户信息
export const savaUser: SavaUserType = (payload) => {
    return {
        type: 'profile/user',
        payload
    }
}

// 获取用户信息
export const getUser = () => {
    return async (dispatch: Dispatch) => {
        let res = await http.get('/user')
        dispatch(savaUser(res.data))
        return res
    }
}

// 储存用户编辑信息的action
export const saveProfile = (payload: ProfileType): ActionType => {
    return {
        type: 'profile/profile',
        payload
    }
}

// 获取用户编辑信息
export const getProfile = () => {
    return async (dispatch: Dispatch) => {
        let res = await http.get('user/profile')
        // console.log(res.data);
        dispatch(saveProfile(res.data))
        return res
    }
}

type ParProfileType = Partial<ProfileType>
// 修改用户信息
export const updateProfile = (data: ParProfileType) => {
    return async (dispatch: any) => {
        await http.patch('/user/profile', data)
        // 重新渲染
        dispatch(getProfile())
    }
}

// 修改图片
export const updatePhoto = (fd: FormData) => {
    return async (dispatch: any) => {
        await http.patch('/user/photo', fd)
        // 重新渲染
        dispatch(getProfile())
    }
}