/*
 * @Author: quan
 * @Date: 2022-05-26 22:23:07
 * @LastEditors: quan
 * @LastEditTime: 2022-07-18 10:52:27
 * @Description: file content
 */
// redux 
import { createStore, applyMiddleware } from 'redux'
// 处理异步
import thunk from 'redux-thunk'
// 调试工具
import { composeWithDevTools } from 'redux-devtools-extension'

// reducers
import reducers from './reducers'
// 缓存token
import {getTokenInfo} from "@/utils/storage";
import { ThunkAction } from 'redux-thunk';
import { LoginActionType } from './reducers/login';
import { ActionType, HomeActionType, SearchActionType } from './types';

/*
* 参数
*   1. reducer
*   2. 指定store的初始值
*   3. 指定中间件
* */
const store = createStore(
    reducers,
    {
        login: getTokenInfo()
    },
    composeWithDevTools(applyMiddleware(thunk))
)
// action类型
type RootActionType = ActionType | LoginActionType | HomeActionType | SearchActionType;

// 获取返回值类型
export type RootState = ReturnType<typeof store.getState>;
// 指定异步返回类型
export type RootThunkAction = ThunkAction<Promise<any>, RootState, unknown, RootActionType>;

export default store