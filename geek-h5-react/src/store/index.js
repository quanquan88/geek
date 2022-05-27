/*
 * @Author: quan
 * @Date: 2022-05-26 22:23:07
 * @LastEditors: quan
 * @LastEditTime: 2022-05-26 22:28:50
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

export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))