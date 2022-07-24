/*
 * @Author: quan
 * @Date: 2022-07-22 16:38:17
 * @LastEditors: quan
 * @LastEditTime: 2022-07-23 22:26:16
 * @Description: file content
 */
import Icon from "@/components/Icon";
import NavBar from "@/components/NavBar";
import { RootState } from "@/store";
import { getArticleDetails, getCommentList } from "@/store/action/article";
import { useEffect, useRef, useState } from "react";
import ContentLoader from "react-content-loader";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./index.module.scss";
import classnames from 'classnames';
import DOMPurify from 'dompurify';
import throttle from 'lodash/throttle'; // 节流
import NoComment from './components/NoComment'
import CommentItem from './components/CommentItem'

// params参数类型
type ParamsTyps = {
	id: string
}

const Article = () => {
	
	const dispatch = useDispatch();
	const params: ParamsTyps = useParams<ParamsTyps>(); // 参数
	const artDetails = useSelector((state: RootState) => state.article.info); // 文章详情
  const [isShowNavAuthor, setShowNavAuthor] = useState<boolean>(false); // 是否显示头部信息
  const authorRef = useRef<HTMLDivElement>(null); // 元素
  const comments = useSelector((state: RootState) => state.article.comments);

	useEffect(() => {
		// 请求
		dispatch(getArticleDetails(params.id));
	}, [dispatch, params.id])
	
  // 处理滚动
  useEffect(() => {
    const onScroll = throttle((): void => {
      // 获取位置参数
      const rect: DOMRect = authorRef.current?.getBoundingClientRect()!;
      // 判断
      rect?.top <= 10 ? setShowNavAuthor(true) : setShowNavAuthor(false);
    }, 500)
    
    document.addEventListener('scroll', onScroll);

    return () => {
      document.removeEventListener('scroll', onScroll)
    }
  }, [])

  // 获取评论
  useEffect(() => {
    dispatch(getCommentList(params.id));
  }, [dispatch, params.id])

  return (
    <div className={styles.root}>
      <div className="root-wrapper">
        {/* 顶部导航栏 */}
        <NavBar
          className="navBar"
          subtitle={
            <span>
              <Icon type="icongengduo" />
            </span>
          }
        >
          {
            isShowNavAuthor ? (
              <div className="nav-author">
                <img src={artDetails.aut_photo} alt="" />
                <span className="name">{artDetails.aut_name}</span>
                <span className={classnames('follow', artDetails.is_followed ? 'followed' : '')}>
                  {artDetails.is_followed ? '已关注' : '关注'}
                </span>
              </div>
            ) : '文章详情'
          }
        </NavBar>

        {false ? (
          // 数据正在加载时显示的骨架屏界面
          <ContentLoader
            speed={2}
            width={375}
            height={230}
            viewBox="0 0 375 230"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            {/* https://skeletonreact.com/ */}
            <rect x="16" y="8" rx="3" ry="3" width="340" height="10" />
            <rect x="16" y="26" rx="0" ry="0" width="70" height="6" />
            <rect x="96" y="26" rx="0" ry="0" width="50" height="6" />
            <rect x="156" y="26" rx="0" ry="0" width="50" height="6" />
            <circle cx="33" cy="69" r="17" />
            <rect x="60" y="65" rx="0" ry="0" width="45" height="6" />
            <rect x="304" y="65" rx="0" ry="0" width="52" height="6" />
            <rect x="16" y="114" rx="0" ry="0" width="340" height="15" />
            <rect x="263" y="208" rx="0" ry="0" width="94" height="19" />
            <rect x="16" y="141" rx="0" ry="0" width="340" height="15" />
            <rect x="16" y="166" rx="0" ry="0" width="340" height="15" />
          </ContentLoader>
        ) : (
          // 数据加载完成后显示的实际界面
          <>
            <div className="wrapper">
              <div className="article-wrapper">
                {/* 文章描述信息栏 */}
                <div className="header">
                  <h1 className="title">{artDetails.title}</h1>

                  <div className="info">
                    <span>{artDetails.pubdate}</span>
                    <span>{artDetails.read_count} 阅读</span>
                    <span>{artDetails.comm_count} 评论</span>
                  </div>

                  <div className="author" ref={authorRef}>
                    <img src={artDetails.aut_photo} alt="" />
                    <span className="name">{artDetails.aut_name}</span>
                    <span className={classnames("follow", { followed: artDetails.is_followed })} >
											{artDetails.is_followed ? '已关注':'+ 关注'}
										</span>
                  </div>
                </div>

                {/* 文章正文内容区域 */}
                <div className="content">
                  <div className="content-html dg-html" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(artDetails.content) }}></div>
                  <div className="date">发布文章时间：{artDetails.pubdate}</div>
                </div>
              </div>

              <div className="comment">
                {/* 评论总览信息 */}
                <div className="comment-header">
                  <span>全部评论（{artDetails.comm_count}）</span>
                  <span>{artDetails.like_count} 点赞</span>
                </div>
                
                {
                  // 评论列表
                  artDetails.comm_count <= 0 ? <NoComment></NoComment> : (
                    <div className="comment-list">
                      {
                        comments.results && comments.results.map(item => {
                          return (
                            <div key={item.com_id}>
                              <CommentItem comments={item}></CommentItem>
                            </div>
                          )
                        })
                      }
                    </div>
                  )
                }
                
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Article;
