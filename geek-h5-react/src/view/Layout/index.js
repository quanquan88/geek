/*
 * @Author: quan
 * @Date: 2022-05-26 22:00:56
 * @LastEditors: quan
 * @LastEditTime: 2022-05-28 22:58:30
 * @Description: file content
 */
import React, { Suspense } from 'react'
// 图标
import Icon from "@/components/Icon";
// 样式
import styles from './index.module.scss'
// className
import classNames from "classnames";
// 路由
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'

// 组件
const Home = React.lazy(() => import('@/view/Home'))
const Question = React.lazy(() => import('@/view/Question'))
const Video = React.lazy(() => import('@/view/Video'))
const Profile = React.lazy(() => import('@/view/Profile'))

export default function Layout() {

    const tabs = [
        {
            title: '首页',
            icon: 'iconbtn_home',
            path: '/home'
        },
        {
            title: '问答',
            icon: 'iconbtn_qa',
            path: '/home/question'
        },
        {
            title: '视频',
            icon: 'iconbtn_video',
            path: '/home/video'
        },
        {
            title: '我的',
            icon: 'iconbtn_mine',
            path: '/home/profile'
        },
    ]

    // 路由方法
    const history = useHistory()
    // 路由信息
    const location = useLocation()

    return (
        <div>
            <div className={styles.root}>
                {/* 区域一：点击按钮切换显示内容的区域 */}
                <div className="tab-content">
                    <Suspense fallback={<div>加载中...</div>}>
                        <Switch>
                            <Route path="/home" exact component={Home}/>
                            <Route path="/home/question" component={Question}/>
                            <Route path="/home/video" component={Video}/>
                            <Route path="/home/profile" component={Profile}/>
                        </Switch>
                    </Suspense>
                </div>
                {/* 区域二：按钮区域，会使用固定定位显示在页面底部 */}
                <div className="tabbar">
                    {
                        tabs.map(item => (
                            <div
                                className={classNames('tabbar-item', {'tabbar-item-active': location.pathname === item.path})}
                                key={item.title}
                                onClick={() => { history.push(item.path) }}
                            >
                                <Icon type={ classNames(location.pathname === item.path ? `${item.icon}_sel` : item.icon)}/>
                                <span>{ item.title }</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

