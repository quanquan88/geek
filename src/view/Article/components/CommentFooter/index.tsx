/*
 * @Author: quan
 * @Date: 2022-07-24 15:51:20
 * @LastEditors: quan
 * @LastEditTime: 2022-07-24 21:45:32
 * @Description: file content
 */
import Icon from '@/components/Icon'
import { RootState } from '@/store'
import { collectArticle, likeArticle } from '@/store/action/article'
import { Toast } from 'antd-mobile'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'

type PropsType = {
  goComment?: () => void
}
/**
 * 评论工具栏组件
 */
const CommentFooter = ({ goComment }: PropsType) => {

  const info = useSelector((state: RootState) => state.article.info); // 文章详情数据
  const type = 'normal';
  const dispatch = useDispatch();

  // 点赞
  const onLike = async () => {
    await dispatch(likeArticle(info.art_id, info.attitude));
    Toast.success("操作成功", 1);
  }
  // 点击收藏
  const onCollect = async () => {
    await dispatch(collectArticle(info.art_id, info.is_collected));
    Toast.success("操作成功", 1);
  }
  return (
    <div className={styles.root}>
      {/* 输入框（是个假的输入框，其实就是个按钮） */}
      <div className="input-btn">
        <Icon type="iconbianji" />
        <span>抢沙发</span>
      </div>

      {type === 'normal' && (
        <>
          {/* 评论按钮 */}
          <div className="action-item" onClick={goComment}>
            <Icon type="iconbtn_comment" />
            <p>评论</p>
            {info.comm_count !== 0 && <span className="bage">{info.comm_count}</span>}
          </div>

          {/* 点赞按钮 */}
          <div className="action-item" onClick={onLike}> 
            <Icon type={info.attitude === 1 ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
            <p>点赞</p>
          </div>
        </>
      )}

      {/* 收藏按钮 */}
      <div className="action-item" onClick={onCollect}>
        <Icon type={info.is_collected ? 'iconbtn_collect_sel' : 'iconbtn_collect'} />
        <p>收藏</p>
      </div>

      {/* 分享按钮 */}
      <div className="action-item">
        <Icon type="iconbtn_share" />
        <p>分享</p>
      </div>
    </div>
  )
}

export default CommentFooter
