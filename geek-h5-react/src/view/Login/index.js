/*
 * @Author: quan
 * @Date: 2022-05-26 22:01:01
 * @LastEditors: quan
 * @LastEditTime: 2022-06-02 15:52:47
 * @Description: file content
 */
import React, {useState} from 'react'
// 栏目组件
import NavBar from '@/components/NavBar'
// 表单组件
import CuInput from '@/components/CuInput'
// 样式
import styles from './index.module.scss'
// formik表单插件
import { useFormik } from 'formik'
// 校验工具
import * as Yup from 'yup'
// 正则
import { isMobile } from '@/utils/regular'
// redux
import { useDispatch } from 'react-redux'
// action
import { sendValidationCode, login } from '@/store/action/login'

// UI组件库
import { Toast } from 'antd-mobile';
import {useHistory} from "react-router-dom";

export default function Login() {

  // 路由跳转
  const history = useHistory()
  // redux 方法
  const dispatch = useDispatch()
  // 倒计时时间
  const [time, settime] = useState(0)



  // 点击extra事件
  const onExtraClick = () => {
    if(time > 0) return;
    // console.log('点击事件触发');
    // 校验手机号
    if(!isMobile(mobile)){
      formik.setTouched({
        mobile: true
      })
      return
    }

    // 请求
    dispatch(sendValidationCode(mobile)).then(() => {
      // console.log(res);
      Toast.success('获取验证码成功', 1)

      // 开启倒计时
      let timeId = settime(60)
      setInterval(() => {
        settime(time => {
          if(time === 1) clearInterval(timeId)
          return time - 1
        })
      },1000)
    })
    .catch(err => {
      console.log(err.response.data.message);
      if(err.response){
        Toast.info(err.response.data.message)
      }else {
        Toast.info('服务器繁忙，请稍后重试')
      }
    })
  }

  const formik = useFormik({
    // 数据
    initialValues: {
      mobile: '13911111111',
      code: '246810'
    },
    // 提交
    onSubmit(value) {
      console.log(value);
      dispatch(login(value)).then(() => {
        // console.log(res);
        Toast.success('登录成功',1)
        // 跳转首页
        history.push('/home')
      })
    },
    // 校验
    validationSchema: Yup.object({
      mobile: Yup.string().trim().required('手机号不能为空').matches(/^(?:(?:\+|00)86)?1[3-9]\d{9}$/, '手机号码格式不正确'),
      code: Yup.string().trim().required('验证码不正为空').matches(/^\d{6}$/, '请输入六位数的验证码')
    })
  })
  let {
    values: { mobile, code },
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    isValid
  } = formik

  return (
    <div className={styles.root}>
      <NavBar>登录</NavBar>
      <div className="content">
        {/* 标题 */}
        <h3>短信登录</h3>
        <form onSubmit={handleSubmit}>
          {/* 手机号输入框 */}
          <div className="input-item">
            <div className="input-box">
              <CuInput 
                name="mobile" 
                value={mobile} 
                onChange={handleChange} 
                onBlur={handleBlur}
                autoComplete="off"
                placeholder="请输入手机号码"
              />
            </div>
            {  
              touched.mobile && errors.mobile ? <div className="validate">{errors.mobile}</div> : null
            }
          </div>

          {/* 短信验证码输入框 */}
          <div className="input-item">
            <div className="input-box">
              <CuInput
                autoComplete="off"
                name="code"
                value={code}
                onChange={handleChange}
                extra={ time <= 0 ? '获取验证码' : `${time}s后获取` }
                onExtraClick={onExtraClick}
                onBlur={handleBlur}
                placeholder="请输入验证码"
              />
            </div>
            {  
              touched.code && errors.code ? <div className="validate">{errors.code}</div> : null
            }
          </div>

          {/* 登录按钮 */}
          <button type="submit" className={`login-btn ${isValid?'':'disabled'}`} disabled={!isValid}>
            登录
          </button>
        </form>
      </div>
    </div>
  )
}
