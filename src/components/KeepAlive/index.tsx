/*
 * @Author: quan
 * @Date: 2022-07-27 10:45:20
 * @LastEditors: quan
 * @LastEditTime: 2022-07-27 10:47:54
 * @Description: file content
 */
import { Route, RouteProps } from 'react-router-dom'
import styles from './index.module.scss'

// 类型
interface Props extends RouteProps {
  alivePath: string,
  component: any
}
/**
 * 缓存路由组件
 * @param {String} props.alivePath 要缓存的路径 
 * @param {ReactElement} props.component 匹配路由规则后显示的组件 
 * @param {rest} props.rest 任何 Route 组件可用的属性 
 */
const KeepAlive = ({ alivePath, component: Component, ...rest }: Props) => {
  return (
    <Route {...rest}>
      {
        props => {
          const { location } = props
          const matched = location.pathname.startsWith(alivePath)
          return (
            <div className={styles.root} style={{ display: matched ? 'block' : 'none' }}>
              <Component {...props} />
            </div>
          )
        }
      }
    </Route>
  )
}

export default KeepAlive
