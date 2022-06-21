/*
 * @Author: quan
 * @Date: 2022-06-08 22:23:09
 * @LastEditors: quan
 * @LastEditTime: 2022-06-21 22:25:26
 * @Description: file content
 */
import React, {useEffect, useRef, useState} from 'react';
// 样式
import styles from './textarea.module.scss'
// 处理多个classname
import classnames from "classnames";

// 类型
interface Props extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    maxLength: number,
    className?: string,
    autoFocus?: boolean
}

const Textarea = ({ maxLength = 100, className, autoFocus, ...rest }: Props) => {
    // 文本框的值
    const [value, setValue] = useState(rest.value || '')
    // 文本框
    const areaRef = useRef<HTMLTextAreaElement>(null)

    // 文本改变触发
    const onchange = (e :React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value)
        // 执行外部传来的函数
        rest.onChange?.(e)
    }

    // 进入执行
    useEffect(() => {
        if(autoFocus) {
            areaRef.current!.focus()
            areaRef.current!.setSelectionRange(-1, -1)
        }
    }, [autoFocus])

    return (
        <div className={styles.root}>
            {/* 文本输入框 */}
            <textarea
                ref={areaRef}
                className={classnames('textarea', className)}
                value={value}
                maxLength={maxLength}
                onChange={onchange}
                {...rest}
            />

            {/* 文本字数 */}
            <div className="count">
                {(value as string).length}/{maxLength}
            </div>
        </div>
    );
};

export default Textarea;