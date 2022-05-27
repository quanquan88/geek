/*
 * @Author: quan
 * @Date: 2022-05-24 22:35:44
 * @LastEditors: quan
 * @LastEditTime: 2022-05-26 23:15:48
 * @Description: file content
 */
import React, { Suspense } from 'react'

// 导入路由
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

// 首页 React.lazy懒加载
const Home = React.lazy(() => import('@/view/Home'))
// 登录页
const Login = React.lazy(() => import('@/view/Login'))

export default function App() {
  return (
    <Router>
      <Suspense fallback={<div>加载中...</div>}>
        <Switch>
          <Redirect exact from='/' to="/home"></Redirect>
          <Route path="/home" component={Home}></Route>
          <Route path="/login" component={Login}></Route>
        </Switch>
      </Suspense>
    </Router>
  )
}
