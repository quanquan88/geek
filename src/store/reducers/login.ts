/*
 * @Author: quan
 * @Date: 2022-07-08 11:02:13
 * @LastEditors: quan
 * @LastEditTime: 2022-07-15 10:12:07
 * @Description: file content
 */
import {Token} from '@/utils/storage'

// action类型
export type LoginActionType = {
    type: 'login/token',
    payLoad: Token
}

const initState: Token = {
    token: '',
    refresh_token: ''
}

export default function reducer(state = initState, action: LoginActionType){
    const { type, payLoad } = action
    if(type === 'login/token'){
        return payLoad
    }
    return state
}