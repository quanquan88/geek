/*
 * @Author: quan
 * @Date: 2022-05-26 22:01:01
 * @LastEditors: quan
 * @LastEditTime: 2022-05-29 16:43:47
 * @Description: file content
 */
import React from 'react'
// 栏目组件
import NavBar from '@/components/NavBar'
// 表单组件
import CuInput from '@/components/CuInput'
// 样式
import styles from './index.module.scss'

export default function Login() {

  // 点击extra事件
  const onExtraClick = () => {
    console.log('点击事件触发');
  }

  return (
    <div className={styles.root}>
      <NavBar>登录</NavBar>
      <div className="content">
        {/* 标题 */}
        <h3>短信登录</h3>
        <form>
          {/* 手机号输入框 */}
          <div className="input-item">
            <div className="input-box">
              <CuInput />
            </div>
            <div className="validate">手机号验证错误信息</div>
          </div>

          {/* 短信验证码输入框 */}
          <div className="input-item">
            <div className="input-box">
              <CuInput extra="获取验证码" onExtraClick={onExtraClick} />
            </div>
            <div className="validate">验证码验证错误信息</div>
          </div>

          {/* 登录按钮 */}
          <button type="submit" className="login-btn">
            登录
          </button>
        </form>
      </div>
    </div>
  )
}
