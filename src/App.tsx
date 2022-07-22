/*
 * @Author: quan
 * @Date: 2022-05-24 22:35:44
 * @LastEditors: quan
 * @LastEditTime: 2022-07-22 10:53:36
 * @Description: file content
 */
import React, {Suspense} from 'react'

// 导入路由
import {Router, Route, Switch, Redirect} from 'react-router-dom'
// 自定义路由权限
import AuthRoute from "@/components/AuthRoute/AuthRoute";
// history
import history from "@/utils/history";

// 首页 React.lazy懒加载
const Home = React.lazy(() => import('@/view/Layout'))
// 登录页
const Login = React.lazy(() => import('@/view/Login'))
// 编辑个人信息
const Edit = React.lazy(() => import('@/view/Profile/Edit'))
// 小智聊天
const Chat = React.lazy(() => import('@/view/Profile/Chat/Chat'))
// 用户反馈
const Feedback = React.lazy(() => import('@/view/Profile/Feedback'))
const Search = React.lazy(() => import('@/view/Search')); // 搜索
const SearchResult = React.lazy(() => import('@/view/Search/Result')); // 搜索


// 404
const NotFound = React.lazy(() => import('@/view/NotFound/NotFound'))


export default function App() {
    return (
        <Router history={history}>
            <Suspense fallback={<div>加载中...</div>}>
                <Switch>
                    {/* 重定向 */}
                    <Redirect exact from='/' to="/home"/>
                    {/* 首页 */}
                    <Route path="/home" component={Home}/>
                    {/* 登录 */}
                    <Route path="/login" component={Login}/>
                    <Route path="/search" exact component={Search}/>
                    <Route path="/search/result" exact component={SearchResult}/>

                    {/* 以下是需要登录的组件 */}
                    {/* 个人信息编辑 */}
                    <AuthRoute path="/profile/edit" component={Edit}/>
                    {/* 小智聊天 */}
                    <AuthRoute path="/profile/chat" component={Chat}/>
                    {/* 用户反馈 */}
                    <AuthRoute path="/profile/feedback" component={Feedback} />

                    <Route component={NotFound}/>
                </Switch>
            </Suspense>
        </Router>
    )
}
