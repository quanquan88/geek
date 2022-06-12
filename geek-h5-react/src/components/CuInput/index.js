/*
 * @Author: quan
 * @Date: 2022-05-29 16:28:16
 * @LastEditors: quan
 * @LastEditTime: 2022-05-29 16:44:43
 * @Description: file content
 */
import React, {useEffect, useRef} from 'react'
// 样式
import styles from './index.module.scss'
import classnames from "classnames";

export default function CuInput({extra, className, onExtraClick, autoFocus, ...rest}) {

    const inputRef = useRef(null)
    // 进入页面执行
    useEffect(() => {
        if(autoFocus) {
            inputRef.current.focus()
        }
    }, [])

    return (
        <div className={styles.root}>
            <input ref={inputRef} {...rest} type="text" className={classnames('input', className)}/>
            {extra && <div className='extra' onClick={onExtraClick}>{extra}</div>}
        </div>
    )
}

