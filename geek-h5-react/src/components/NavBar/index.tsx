/*
 * @Author: quan
 * @Date: 2022-05-28 14:57:05
 * @LastEditors: quan
 * @LastEditTime: 2022-05-28 23:47:11
 * @Description: file content
 */

import React, {ReactElement} from 'react'
// 图标组件
import Icon from '@/components/Icon'
// 样式
import styles from './index.module.scss'

// 解决独立封住的组件获取不到history match loaction问题
import { useHistory } from 'react-router-dom'
import classnames from "classnames";

// history match loaction: 这个组件必须是通过路由配置的

// 定义props的类型
type Props = {
    children: string | ReactElement,
    subtitle?: string | ReactElement, // ?:可选的
    className?: string,
    onLeftClick?: () => void
}

function NavBar({ children, subtitle, onLeftClick, className }: Props) {
    const history = useHistory()

    // 点击返回上一层事件
    const back = () => {
        if(onLeftClick){
            onLeftClick()
        }else {
            history.goBack()
        }
    }

    return (
        <div className={classnames(styles.root, className)}>
            {/* 后退按钮 */}
            <div className="left" onClick={back}>
                <Icon type="iconfanhui" />
            </div>
            {/* 居中标题 */}
            <div className="title">{ children }</div>

            {/* 右侧内容 */}
            <div className="right">{subtitle}</div>
        </div>
    )
}

export default NavBar