/*
 * @Author: quan
 * @Date: 2022-07-04 11:21:08
 * @LastEditors: quan
 * @LastEditTime: 2022-07-13 15:16:38
 * @Description: file content
 */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllChannels, getUserChannels } from '@/store/action/home';
import styles from './index.module.scss' // 样式
import Tabs from '@/components/Tabs';
import Icon from '@/components/Icon';
import MoreAction from './components/MoreAction'
import { Drawer } from 'antd-mobile';
import Channels from './components/Channels';
import ArticleList from './components/ArtList';

export default function Home() {

	const dispatch = useDispatch(); // dispatch
  const [open, setOpen] = useState(false); // 频道抽屉状态
  const [active, setActive] = useState(0); // 高亮下标 

  // 点击关闭抽屉事件
  const onClose = () => {
    setOpen(false);
  }

  // 点击tabs触发
  const onChange = index => {
    // console.log(index);
    setActive(index)
  }

	useEffect(() => {
    // 获取用户频道
		dispatch(getUserChannels());
    // 获取全部频道
    dispatch(getAllChannels());
	}, [dispatch])

  const tabs = useSelector(state => state.home.userChannels)
  // console.log(tabs);
  return (
    <div className={styles.root}>
        <Tabs tabs={tabs} index={active} onChange={onChange}>
          {
            /* 文章列表 */
            tabs.map(item => (
              <ArticleList key={item.id} channelId={item.id} aid={tabs[active].id} ></ArticleList>
            ))
          }
        </Tabs>
        {/* 图标 */}
        <div className='tabs-opration'>
          <Icon type='iconbtn_search' />
          <Icon type='iconbtn_channel' onClick={() => setOpen(true)} />
        </div>

        {/* 抽屉 */}
        <Drawer 
          className='my-drawer'
          position='left' 
          children={''}
          sidebar={
            open && 
            <Channels 
              onClose={() => onClose()} 
              tabActiveIndex={active} 
              onChannelClick={onChange} 
            /> 
          }
          open={open}
        />

        {/* 弹框 */}
        <MoreAction></MoreAction>
    </div>
  )
}
