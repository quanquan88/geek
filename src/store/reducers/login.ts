/*
 * @Author: quan
 * @Date: 2022-07-08 11:02:13
 * @LastEditors: quan
 * @LastEditTime: 2022-07-14 10:37:41
 * @Description: file content
 */
import {Token} from '@/utils/storage'

// action类型
type Action = {
    type: string,
    payLoad: Token
}

const initState: Token = {
    token: '',
    refresh_token: ''
}

export default function reducer(state = initState, action: Action){
    const { type, payLoad } = action
    if(type === 'login/token'){
        return payLoad
    }
    return state
}