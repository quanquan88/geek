/*
 * @Author: quan
 * @Date: 2022-07-11 14:53:22
 * @LastEditors: quan
 * @LastEditTime: 2022-07-15 16:46:16
 * @Description: file content
 */
import styles from './index.module.scss'

import ArticleItem from '../ArtItem'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getArtList } from '@/store/action/home'
import { PullToRefresh, InfiniteScroll } from 'antd-mobile-v5'

/** 文章列表组件 */
const ArticleList = ({ channelId, aid }) => {

  const dispathch = useDispatch()
  // 列表数据
  const current = useSelector(state => state.home.articles[channelId])
  // 是否有加载数据
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // 存在则停止
    if(current) return
    // 判断只有高亮的才能请求
    if(channelId === aid) {
      dispathch(getArtList(channelId, Date.now()))
    }
  }, [channelId, aid, dispathch, current])

  // 触发刷新事件
  const onRefresh = () => {
    // 重新启动上拉加载
    setHasMore(true)
    // 请求
    return dispathch(getArtList(channelId, Date.now()))
  }
  // 触发加载事件
  const loadMore = () => {
    // console.log('加载数据');
    return dispathch(getArtList(channelId, current.timestamp, true)).then(res => {
      const {pre_timestamp} = res.data
      if(!pre_timestamp) {
        
        setHasMore(false)
      }
    })
  }

  if(!current) return null

  return (
    <div className={styles.root}>
      {/* 下拉刷新 */}
      <PullToRefresh
        onRefresh={onRefresh}
      >
      {
        current.list.map(item => (
            <div className='article-item' key={item.art_id}>
              <ArticleItem data={item} channelId={channelId} ></ArticleItem>
            </div>
        ))
        
      }
      </PullToRefresh>

      {/* 上拉加载 */}
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore}></InfiniteScroll>
    </div>
  )
}

export default ArticleList