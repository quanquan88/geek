/*
 * @Author: quan
 * @Date: 2022-07-04 17:18:06
 * @LastEditors: quan
 * @LastEditTime: 2022-07-08 17:35:16
 * @Description: file content
 */
import Icon from '@/components/Icon'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'
import classNames from 'classnames'
import { useState } from 'react'
import { removeChannel } from '@/store/action/home'
import { Toast } from 'antd-mobile'

/**
 * 频道管理组件
 * @param {Number} props.tabActiveIndex 用户选中的频道的索引
 * @param {Function} props.onClose 关闭频道管理抽屉时的回调函数
 * @param {Function} props.onChannelClick 当点击频道列表中的某个频道时的会带哦函数
 */
const Channels = ({ tabActiveIndex, onClose, onChannelClick }) => {

  const dispathch =  useDispatch()
  const userChannels = useSelector(state => state.home.userChannels); // 获取频道
  // 推荐频道
  const recommendChannels = useSelector(state => {
    const {userChannels, allChannels} = state.home

    return allChannels.filter(item => {
      return userChannels.findIndex(v => v.id === item.id) === -1;
    })
  })
  const [editing, setEditing] = useState(false); // 是否编辑状态

  // 点击频道触发
  const handleChannel = (i) => {
    if(editing) return
    onChannelClick(i);
    onClose();
  }
  // 点击删除频道
  const removeItem = async row => {
    if(userChannels.length <= 4) {
      return Toast.info('至少保留3个')
    }
    // console.log(row);
    await dispathch(removeChannel(row));
    Toast.success('删除成功', 1)
  }

  return (
    <div className={styles.root}>
      {/* 顶部栏：带关闭按钮 */}
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={onClose} />
      </div>

      {/* 频道列表 */}
      <div className="channel-content">
        {/* 当前已选择的频道列表 */}
        <div className={classNames('channel-item', {'edit': editing})}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">
              {editing ? '点击删除频道' : '点击进入频道'}
            </span>
            <span 
              className="channel-item-edit" 
              onClick={() => setEditing(!editing)}
            >
              {editing ? '完成' : '编辑'}
            </span>
          </div>

          <div className="channel-list">
            {
              userChannels.map((item, i) => {
                return (
                  <span 
                    className={classNames('channel-list-item', {'selected': i === tabActiveIndex})} 
                    key={i}
                    onClick={() => handleChannel(i)}
                  >
                    {item.name}
                    {
                      item.id !== 0 &&
                      <Icon type="iconbtn_tag_close" onClick={() => removeItem(item)} />
                    }
                  </span>
                )
              })
            }
            
          </div>
        </div>

        {/* 推荐的频道列表 */}
        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
          </div>
          <div className="channel-list">
            {
              recommendChannels.map(item => {
                return (
                  <span key={item.id} className="channel-list-item">
                    + {item.name}
                  </span>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels