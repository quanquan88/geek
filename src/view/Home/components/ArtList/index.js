/*
 * @Author: quan
 * @Date: 2022-07-11 14:53:22
 * @LastEditors: quan
 * @LastEditTime: 2022-07-11 17:48:06
 * @Description: file content
 */
import styles from './index.module.scss'

import ArticleItem from '../ArtItem'
import { useEffect, useState } from 'react'
import { artList } from '@/api/article'

/** 文章列表组件 */
const ArticleList = ({ channelId, aid }) => {
  const [list, setList] = useState([]); // 列表

  useEffect(() => {
    // 1.判断只有高亮的才能请求
    if(channelId === aid) {
      artList({ channel_id: channelId, timestamp: Date.now() })
      .then(res => {
        // console.log(res);
        setList(res.data.results)
      })
    }
  }, [channelId, aid])

  return (
    <div className={styles.root}>
      {
        list.map(item => (
            <div className='article-item' key={item.art_id}>
              <ArticleItem data={item} ></ArticleItem>
            </div>
        ))
        
      }
    </div>
  )
}

export default ArticleList