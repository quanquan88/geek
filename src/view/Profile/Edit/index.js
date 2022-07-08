import React, {useEffect, useRef, useState} from 'react';
// 头部导航
import NavBar from "@/components/NavBar";
// 样式
import styles from './index.module.scss'
// antd组件
import {List, DatePicker, Drawer, Toast, Modal} from 'antd-mobile';
import {useDispatch, useSelector} from "react-redux";
import {getProfile, updatePhoto, updateProfile} from "@/store/action/profile";
import classNames from "classnames";
// 局部组件
import EditInput from "@/view/Profile/Edit/components/EditInput/EditInput";
import EditList from "@/view/Profile/Edit/components/EditList/EditList";
// 时间格式化
import dayjs from "dayjs";
import {removeToken} from "@/store/action/login";
import {useHistory} from "react-router-dom";

const Item = List.Item;

const ProfileEdit = () => {

    // 文件选择input
    const fileRef = useRef(null)
    // redux异步方法
    const dispatch = useDispatch()
    // history
    const history = useHistory()
    // 获取数据
    const data = useSelector(state => state.profile.profile)
    // 性别字典
    const genderDict = {
        0: '男',
        1: '女'
    }
    // 抽屉配置
    const [open, setOpen] = useState({
        visible: false, // 显示状态
        type: '', // 标识 name名称 intro简介
    })
    // 列表抽屉的状态配置
    const [listOpen, setListOpen] = useState({
        visible: false, // 状态
        type: '',  // avatar头像 gender性别
    })
    // 头像和性别list
    const config = {
        photo: [
            {
                title: '拍照',
                onClick: () => {
                    Toast.info('H5不支持', 1)
                },
            },
            {
                title: '本地选择',
                onClick: () => {
                    // 触发文件选择
                    fileRef.current.click()
                },
            },
        ],
        gender: [
            {
                title: '男',
                onClick: async () => {
                    await onCommit('gender', 0)
                },
            },
            {
                title: '女',
                onClick: async () => {
                    await onCommit('gender', 1)
                },
            },
        ],
    }

    // 关闭抽屉事件
    const onClose = () => {
        setOpen({visible: false, type: ''})
        setListOpen({visible: false, type: ''})
    }

    // 副作用函数
    useEffect(() => {
        dispatch(getProfile())
    }, [dispatch])

    // 点击提交
    const onCommit = async (type, val) => {
        // console.log(type, val)
        await dispatch(updateProfile({[type]: val}))
        // 成功
        Toast.success('修改成功', 1)
        // 关闭抽屉
        onClose()
    }

    // 文件上传事件
    const onFileChange = (e) => {
        // 上传的文件
        const file = e.target.files[0]
        // 创建一个FormData
        const fd = (new FormData())
        fd.append('photo', file)
        // console.log(e.target)
        // 修改请求
        dispatch(updatePhoto(fd))
        // 成功
        Toast.success('修改成功', 1)
        // 关闭
        onClose()
    }

    // 点击退出
    const logout = () => {
        Modal.alert('温馨提示', '你确定要退出吗?', [{text: '取消'}, {
            text: '确定', onPress() {
                dispatch(removeToken())
                // 跳转登录页
                history.replace('/login')
                Toast.success('退出成功', 1)
            }
        }])
    }

    return (
        <div className={styles.root}>
            <div className="content">
                {/* 导航栏 */}
                <NavBar>个人信息</NavBar>

                <div className="wrapper">
                    <List className="profile-list">
                        {/* 头像 */}
                        <Item
                            arrow="horizontal"
                            extra={
                                <span className="avatar-wrapper">
                                    <img src={data.photo} alt=""/>
                                </span>
                            }
                            onClick={() => {
                                setListOpen({
                                    visible: true,
                                    type: 'photo'
                                })
                            }}
                        >
                            头像
                        </Item>
                        {/* 昵称 */}
                        <Item arrow="horizontal" extra={data.name}
                              onClick={() => setOpen({visible: true, type: 'name'})}>昵称</Item>
                        {/* 简介 */}
                        <Item
                            arrow="horizontal"
                            extra={
                                <span
                                    className={classNames('intro', data.intro ? 'normal' : '')}
                                >
                                    {data.intro || '未填写'}
                                </span>
                            }
                            onClick={() => setOpen({visible: true, type: 'intro'})}
                        >
                            简介
                        </Item>
                    </List>
                    <List className="profile-list">
                        {/* 性别 */}
                        <Item
                            arrow="horizontal"
                            extra={genderDict[data.gender]}
                            onClick={() => {
                                setListOpen({
                                    visible: true,
                                    type: 'gender'
                                })
                            }}
                        >性别</Item>
                        {/* 生日 */}
                        <DatePicker
                            mode="date"
                            value={new Date(data.birthday)}
                            title="选择年月日"
                            minDate={new Date(1900, 1, 1, 0, 0, 0)}
                            maxDate={new Date()}
                            onChange={e => {
                                onCommit('birthday', dayjs(e).format('YYYY-MM-DD'))
                            }}
                        >
                            <Item arrow="horizontal" extra={'2022-01-01'}>生日</Item>
                        </DatePicker>
                    </List>
                </div>

                {/* 底部栏：退出登录按钮 */}
                <div className="logout">
                    <button className="btn" onClick={logout}>退出登录</button>
                </div>

                {/* 文件选择 */}
                <input ref={fileRef} type="file" hidden onChange={onFileChange}/>
            </div>

            {/* 抽屉组件 */}
            <Drawer
                position="right"
                className="drawer"
                sidebar={
                    open.visible && (
                        <EditInput
                            type={open.type}
                            onClose={() => onClose()}
                            onCommit={onCommit}
                        />
                    )
                }
                open={open.visible}
            >
                ''
            </Drawer>

            {/* 头像、性别 */}
            <Drawer
                className="drawer-list"
                position="bottom"
                sidebar={
                    listOpen.visible && <EditList config={config} onClose={() => onClose()} type={listOpen.type}/>
                }
                onOpenChange={onClose}
                open={listOpen.visible}
            >
                {''}
            </Drawer>
        </div>
    );
};

export default ProfileEdit;