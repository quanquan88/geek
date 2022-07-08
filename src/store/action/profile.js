/*
 * @Author: quan
 * @Date: 2022-07-04 11:21:08
 * @LastEditors: quan
 * @LastEditTime: 2022-07-04 11:54:52
 * @Description: file content
 */
import http from "@/utils/request";
// 常量
import {PROFILE_EDIT, PROFILE_USER} from "@/store/action_type/profile";

// 用户信息
export const savaUser = (payload) => {
    return {
        type: PROFILE_USER,
        payload
    }
}

// 获取用户信息
export const getUser = () => {
    return async dispatch => {
        let res = await http.get('/user')
        dispatch(savaUser(res.data))
        return res
    }
}

// 储存用户编辑信息的action
export const saveProfile = (payload) => {
    return {
        type: PROFILE_EDIT,
        payload
    }
}

// 获取用户编辑信息
export const getProfile = () => {
    return async dispatch => {
        let res = await http.get('user/profile')
        // console.log(res.data);
        dispatch(saveProfile(res.data))
        return res
    }
}

// 修改用户信息
export const updateProfile = (data) => {
    return async dispatch => {
        await http.patch('/user/profile', data)
        // 重新渲染
        dispatch(getProfile())
    }
}

// 修改图片
export const updatePhoto = (fd) => {
    return async dispatch => {
        await http.patch('/user/photo', fd)
        // 重新渲染
        dispatch(getProfile())
    }
}