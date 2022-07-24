/*
 * @Author: quan
 * @Date: 2022-07-23 21:48:38
 * @LastEditors: quan
 * @LastEditTime: 2022-07-23 22:35:33
 * @Description: file content
 */
import Icon from '@/components/Icon'
import { CommentType } from '@/store/types'
// import classnames from 'classnames'
import styles from './index.module.scss'
import dayjs from 'dayjs'





// 传输类型
type PropsType = {
    comments: CommentType
}

/**
 * 评论项组件
 */
const CommentItem = ({comments}: PropsType) => {
  return (
    <div className={styles.root}>

      {/* 评论者头像 */}
      <div className="avatar">
        <img src={comments.aut_photo} alt="" />
      </div>

      <div className="comment-info">

        {/* 评论者名字 */}
        <div className="comment-info-header">
          <span className="name">{comments.aut_name}</span>

          {/* 关注或点赞按钮 */}
          {/* {comments.is_followed === 'normal' ? (
            <span className="thumbs-up" onClick={onThumbsUp}>
              {comments.like_count} <Icon type={isLiking ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
            </span>
          ) : (
            <span className={classnames('follow', isFollowed ? 'followed' : '')}>
              {isFollowed ? '已关注' : '关注'}
            </span>
          )} */}
          <span className="thumbs-up">
            {comments.like_count} 
            <Icon type={comments.is_liking ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
          </span>
        </div>

        {/* 评论内容 */}
        <div className="comment-content">{comments.content}</div>

        <div className="comment-footer">
          {/* 回复按钮 */}
          {/* {type === 'normal' && (
            <span className="replay" onClick={() => onOpenReply(commentId)}>
              {replyCount === 0 ? '' : replyCount}回复 <Icon type="iconbtn_right" />
            </span>
          )} */}
          <span className="replay">
            {comments.reply_count === 0 ? '' : comments.reply_count}回复 <Icon type="iconbtn_right" />
          </span>

          {/* 评论日期 */}
          <span className="comment-time">{dayjs(comments.pubdate).fromNow()}</span>
        </div>

      </div>
    </div>
  )
}

export default CommentItem
