/*
 * @Author: quan
 * @Date: 2022-07-22 16:38:17
 * @LastEditors: quan
 * @LastEditTime: 2022-07-22 17:45:36
 * @Description: file content
 */
import Icon from "@/components/Icon";
import NavBar from "@/components/NavBar";
import { RootState } from "@/store";
import { getArticleDetails } from "@/store/action/article";
import { useEffect } from "react";
import ContentLoader from "react-content-loader";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./index.module.scss";
import classnames from 'classnames';

// params参数类型
type ParamsTyps = {
	id: string
}

const Article = () => {
	
	const dispatch = useDispatch();
	const params: ParamsTyps = useParams<ParamsTyps>(); // 参数
	const artDetails = useSelector((state: RootState) => state.article.info); // 文章详情


	useEffect(() => {
		// 请求
		dispatch(getArticleDetails(params.id));
	}, [dispatch, params.id])
	

  return (
    <div className={styles.root}>
      <div className="root-wrapper">
        {/* 顶部导航栏 */}
        <NavBar
          subtitle={
            <span>
              <Icon type="icongengduo" />
            </span>
          }
        >
          {/* <div className="nav-author">
            <img src={''} alt="" />
            <span className="name">{'张三'}</span>
            <span className="follow">关注</span>
          </div> */}
					文章详情
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

                  <div className="author">
                    <img src={artDetails.aut_photo} alt="" />
                    <span className="name">{artDetails.aut_name}</span>
                    <span className={classnames("follow", { followed: artDetails.is_followed })} >
											{artDetails.is_followed ? '已关注':'+ 关注'}
										</span>
                  </div>
                </div>

                {/* 文章正文内容区域 */}
                <div className="content">
                  <div className="content-html dg-html" dangerouslySetInnerHTML={{ __html: artDetails.content }}></div>
                  <div className="date">发布文章时间：{artDetails.pubdate}</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Article;
