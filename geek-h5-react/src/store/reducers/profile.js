import {PROFILE_EDIT, PROFILE_USER} from "@/store/action_type/profile";

const initVal = {
    user: {}, // 我的信息
    profile: {} // 编辑信息
}

export default function reducer(prestate = initVal, action){

    const { type, payload } = action

    if(type === PROFILE_USER){
        return {
            ...prestate,
            user: payload
        }
    }
    if(type === PROFILE_EDIT){
        return {
            ...prestate,
            profile: payload
        }
    }
    return prestate
}