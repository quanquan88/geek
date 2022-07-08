/*
 * @Author: quan
 * @Date: 2022-07-04 11:21:08
 * @LastEditors: quan
 * @LastEditTime: 2022-07-04 17:48:15
 * @Description: file content
 */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserChannels } from '@/store/action/home';
import styles from './index.module.scss' // 样式
import Tabs from '@/components/Tabs';
import Icon from '@/components/Icon';
import { Drawer } from 'antd-mobile';
import Channels from './components/Channels';

export default function Home() {

	const dispatch = useDispatch();

  // 频道抽屉状态
  const [open, setOpen] = useState(false)

  // 点击关闭抽屉事件
  const onClose = () => {
    setOpen(false);
  }

	useEffect(() => {
		dispatch(getUserChannels())
	}, [dispatch])

  const tabs = useSelector(state => state.home.userChannels)
  // console.log(tabs);
  return (
    <div className={styles.root}>
        <Tabs tabs={tabs}></Tabs>
        {/* 图标 */}
        <div className='tabs-opration'>
          <Icon type='iconbtn_search' />
          <Icon type='iconbtn_channel' onClick={() => setOpen(true)} />
        </div>

        {/* 抽屉 */}
        <Drawer 
          position='left' 
          children={''}
          sidebar={ <Channels onClose={() => onClose()} /> }
          open={open}
        />
    </div>
  )
}
