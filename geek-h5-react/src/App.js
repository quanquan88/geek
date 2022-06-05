/*
 * @Author: quan
 * @Date: 2022-05-24 22:35:44
 * @LastEditors: quan
 * @LastEditTime: 2022-05-26 23:15:48
 * @Description: file content
 */
import React, {Suspense} from 'react'

// 导入路由
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

// 首页 React.lazy懒加载
const Home = React.lazy(() => import('@/view/Layout'))
// 登录页
const Login = React.lazy(() => import('@/view/Login'))
// 编辑个人信息
const Edit = React.lazy(() => import('@/view/Profile/Edit'))

export default function App() {
    return (
        <Router>
            <Suspense fallback={<div>加载中...</div>}>
                <Switch>
                    {/* 重定向 */}
                    <Redirect exact from='/' to="/home"/>
                    {/* 首页 */}
                    <Route path="/home" component={Home}/>
                    {/* 登录 */}
                    <Route path="/login" component={Login}/>
                    {/* 个人信息编辑 */}
                    <Route path="/profile/edit" component={Edit}/>
                </Switch>
            </Suspense>
        </Router>
    )
}
