/*
 * @Author: quan
 * @Date: 2022-07-26 10:14:53
 * @LastEditors: quan
 * @LastEditTime: 2022-07-26 16:23:04
 * @Description: file content
 */

import NavBar from '@/components/NavBar'
// import { http } from '@/utils'
import { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'

type PropsType = {
  id?: string,
  name?: string,
  onClose?: () => void,
  onComment?: (value: string) => void,
  articleId?: string
}

/**
 * @param {String} props.id 评论ID
 * @param {String} props.name 评论人姓名 
 * @param {Function} props.onClose 点击返回的回调
 * @param {Function} props.onComment 发表评论成功时的回调函数
 * @param {String} props.articleId 文章ID 
 */
const CommentInput = ({ id, name, onClose, onComment, articleId }: PropsType) => {
  // 输入框内容
  const [value, setValue] = useState('')

  // 输入框引用
  const txtRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
		// 输入框自动聚焦
    setTimeout(() => {
      txtRef.current?.focus()
    }, 600)
  }, [])
  
  // 点击发表
  const onPublish = () => {
    if(!value) return;

    // 回调
    onComment && onComment(value);
    // 重置
    setValue('');
  }

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar
        onLeftClick={onClose}
        subtitle={
          <span className="publish" onClick={onPublish}>发表</span>
        }
      >
        {name ? '回复评论' : '评论文章'}
      </NavBar>

      <div className="input-area">
        {/* 回复别人的评论时显示：@某某 */}
        {name && <div className="at">@{name}:</div>}

        {/* 评论内容输入框 */}
        <textarea
          ref={txtRef}
          placeholder="说点什么~"
          rows={10}
          value={value}
          onChange={e => setValue(e.target.value.trim())}
        />
      </div>
    </div>
  )
}

export default CommentInput
