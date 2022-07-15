/*
 * @Author: quan
 * @Date: 2022-05-26 22:23:07
 * @LastEditors: quan
 * @LastEditTime: 2022-07-14 16:10:00
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

// 获取返回值类型
export type RootState = ReturnType<typeof store.getState>;

export default store