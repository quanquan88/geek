/*
 * @Author: quan
 * @Date: 2022-06-15 21:47:01
 * @LastEditors: quan
 * @LastEditTime: 2022-07-13 10:42:44
 * @Description: file content
 */
import {useEffect, useState} from 'react';
import {Link, useHistory} from "react-router-dom";

const NotFound = () => {
    /**
     * useState 带泛型
     * useRef 带泛型
     * 
     */

    // 倒计时
    const [time, setTime] = useState<number>(3)
    // history
    const history = useHistory()

    // 处理定时器
    useEffect(() => {
        let timer: number = window.setTimeout(() => {
            setTime(time - 1)
        }, 1000)
        
        // 使用完，就销毁
        return () => clearTimeout(timer)
    })

    // 处理跳转
    useEffect(() => {
        if(time === 0) {
            history.push('/home')
        }
    }, [time, history])

    return (
        <div>
            <h1>对不起，你访问的内容不存在...</h1>
            <p>
                {time} 秒后，返回<Link to="/home">首页</Link>
            </p>
        </div>
    );
};

export default NotFound;