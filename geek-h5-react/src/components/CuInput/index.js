/*
 * @Author: quan
 * @Date: 2022-05-29 16:28:16
 * @LastEditors: quan
 * @LastEditTime: 2022-05-29 16:44:43
 * @Description: file content
 */
import React from 'react'
// 样式
import styles from './index.module.scss'

export default function CuInput({ extra, onExtraClick,...rest }) {
  return (
    <div className={styles.root}>
        <input {...rest} type="text" className='input' />
        { extra && <div className='extra' onClick={onExtraClick}>{ extra }</div> }
    </div>
  )
}

