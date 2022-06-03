const initState = {
    token: '',
    refresh_token: ''
}

export default function reducer(state = initState, action){
    const { type, payLoad } = action
    if(type === 'login/token'){
        return payLoad
    }
    return state
}