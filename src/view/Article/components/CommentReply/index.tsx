/*
 * @Author: quan
 * @Date: 2022-07-26 14:13:31
 * @LastEditors: quan
 * @LastEditTime: 2022-07-26 17:04:13
 * @Description: file content
 */
import NavBar from "@/components/NavBar";
import NoComment from "../NoComment";
import { useEffect, useState } from "react";
import CommentFooter from "../CommentFooter";
import CommentInput from "../CommentInput";
import CommentItem from "../CommentItem";
import styles from "./index.module.scss";
import { CommentsListType, CommentType } from "@/store/types";
import { addReply, getReplyList } from "@/api/article";
import {InfiniteScroll, Popup} from 'antd-mobile-v5'

type PropsType = {
  originComment: CommentType,
  articleId: string,
  onClose: () => void
}

/**
 * 回复评论界面组件
 * @param {Object} props.originComment 原评论数据
 * @param {String} props.articleId 文章ID
 * @param {Function} props.onClose 关闭抽屉的回调函数
 */
const CommentReply = ({ originComment, articleId, onClose }: PropsType) => {
  // 评论相关数据
  const [replyList, setReplyList] = useState({} as CommentsListType);
  // 抽屉表单状态
  const [replyPopup, setReplyPopup] = useState({
    visible: false,
    id: originComment.com_id,
  });
  const hasMore = replyList.end_id !== replyList.last_id; // 是否还有更多

  useEffect(() => {
    // 加载回复评论的列表数据
    const loadData = async () => {
      // 请求
      const res = await getReplyList(originComment.com_id);
      // 赋值
      setReplyList(res.data);
    };

    // 只有当原评论数据的 com_id 字段有值才开始加载数据
    if (originComment?.com_id) {
      loadData();
    }
  }, [originComment.com_id]);

  // 展示评论窗口
  const onComment = () => {
    
    setReplyPopup({
      visible: true,
      id: originComment.com_id,
    });
  };

  // 关闭评论窗口
  const onCloseComment = () => {
    setReplyPopup({
      visible: false,
      id: '0',
    });
  };

  const loadMore = async () => {
    // 请求
    const res = await getReplyList(originComment.com_id);
    // 赋值
    setReplyList({
      ...res.data,
      results: [...replyList.results, ...res.data.results]
    })
  }

  // 点击发表
  const onPublishComment = async (val: string) => {
    console.log(val);
    // 请求
    const res = await addReply(originComment.com_id, val, articleId);

    // 赋值
    setReplyList({
      ...replyList,
      results: [res.data.new_obj, ...replyList.results]
    })

    // 关闭
    onCloseComment()
  }

  return (
    <div className={styles.root}>
      <div className="reply-wrapper">
        {/* 顶部导航栏 */}
        <NavBar className="transparent-navbar" onLeftClick={onClose}>
          <div>{originComment.reply_count}条回复</div>
        </NavBar>

        {/* 原评论信息 */}
        <div className="origin-comment">
          <CommentItem
            comments={originComment}
            type="replay" 
          />
        </div>

        {/* 回复评论的列表 */}
        <div className="reply-list">
          <div className="reply-header">全部回复</div>

          {
            originComment.reply_count === 0 ? (<NoComment />) : (
              replyList?.results?.map((item) => {
                return (
                  <CommentItem
                    key={item.com_id}
                    comments={item}
                    type="replay"
                  />
                );
              })
            )
          }
        </div>

        <InfiniteScroll hasMore={hasMore} loadMore={loadMore}></InfiniteScroll>

        {/* 评论工具栏，设置 type="reply" 不显示评论和点赞按钮 */}
        <CommentFooter 
          type="reply" 
          onClickInput={onComment}
        />
      </div>

      {/* 评论表单弹出框 */}
      <Popup
        visible={replyPopup.visible}
        position={'bottom'}
        bodyStyle={{
          height: '100%'
        }}
      >
        <CommentInput 
          onClose={onCloseComment} 
          name={originComment.aut_name}
          onComment={onPublishComment}
        ></CommentInput>
      </Popup>
    </div>
  );
};

export default CommentReply;
