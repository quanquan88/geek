import React, {useEffect, useRef, useState} from 'react';
import styles from './Chat.module.scss'
// 全局组件
import CuInput from "@/components/CuInput";
import NavBar from "@/components/NavBar";
import Icon from "@/components/Icon";
import {useSelector} from "react-redux";
// websocket连接
import io from 'socket.io-client'
import {getTokenInfo} from "@/utils/storage";

const Chat = () => {

    // 头像
    const photo = useSelector(state => state.profile.user.photo)
    // 消息值
    const [msg, setMsg] = useState('')
    // websocket对象
    const socketRef = useRef(null)
    // 聊天窗口元素
    const listRef = useRef(null)

    // 初始化消息列表
    const [msgList, setMsgList] = useState([
        {type: 'robot', text: '亲爱的用户您好，小智同学为您服务'},
        {type: 'user', text: '你好'}
    ])

    // 键盘事件
    const onKeyUp = (e) => {
        if (e.keyCode !== 13) return '停止'
        if (!msg) return '停止'
        /* 按下回车事件 */
        // 添加消息
        setMsgList([
            ...msgList,
            { type: 'user', text: msg }
        ])
        // 向服务器发送消息
        socketRef.current.emit('message',{
            msg, // 消息
            timestamp: Date.now()
        })
        // 清空
        setMsg('')

    }

    // 进入执行
    useEffect(() => {
        // 创建连接
        const socket = io('http://geek.itheima.net', {
            query: {
                token: getTokenInfo().token
            },
            transports: ['websocket']
        })
        socketRef.current = socket

        // 监听连接成功事件
        socket.on('connect', () => {
            console.log('websocket连接成功')
        })

        // 监听接收消息事件
        socket.on('message', e => {
            console.log('接收的消息', e)
            console.log(msgList)
            setMsgList(msgList => {
                return [
                    ...msgList,
                    { type: 'robot', text: e.msg }
                ]
            })
        })

        return () => {
            // 组件销毁时关闭websocket
            socket.close()
        }
    }, [])

    // 副作用
    useEffect(() => {
        const {scrollHeight, offsetHeight} = listRef.current
        // 使滚动条滚动到底部
        listRef.current.scrollTop = scrollHeight - offsetHeight
    }, [msgList])

    return (
        <div className={styles.root}>
            {/* 顶部导航栏 */}
            <NavBar style={{position: 'fixed', top: 0}} className="fixed-header">
                小智同学
            </NavBar>

            {/* 聊天记录列表 */}
            <div className="chat-list" ref={listRef}>
                {
                    msgList.map((item, i) => {
                        if (item.type === 'robot') {
                            return (
                                // 机器人的消息
                                <div key={i} className="chat-item">
                                    <Icon type="iconbtn_xiaozhitongxue"/>
                                    <div className="message">{item.text}</div>
                                </div>
                            )
                        } else {
                            return (
                                // 用户的消息
                                <div key={i} className="chat-item user">
                                    <img src={photo || 'http://toutiao.itheima.net/images/user_head.jpg'} alt=""/>
                                    <div className="message">{item.text}</div>
                                </div>
                            )
                        }
                    })
                }
            </div>

            {/* 底部消息输入框 */}
            <div className="input-footer">
                <CuInput
                    className="no-border"
                    placeholder="请描述您的问题"
                    value={msg}
                    onChange={e => {
                        setMsg(e.target.value)
                    }}
                    onKeyUp={onKeyUp}
                />
                <Icon type="iconbianji"/>
            </div>
        </div>
    );
};

export default Chat;