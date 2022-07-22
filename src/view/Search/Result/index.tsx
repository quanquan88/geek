/*
 * @Author: quan
 * @Date: 2022-07-22 10:45:21
 * @LastEditors: quan
 * @LastEditTime: 2022-07-22 16:27:24
 * @Description: file content
 */

import ArticleItem from "@/view/Home/components/ArtItem";
import NavBar from "@/components/NavBar";
import { RootState } from "@/store";
import { getSearchResult } from "@/store/action/search";
import { ArticleType } from "@/store/types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { InfiniteScroll } from "antd-mobile-v5";
import styles from "./index.module.scss";

let page: number = 1;
const SearchResult = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const search: URLSearchParams = new URLSearchParams(location.search); // 查询参数对象
  const key: string = search.get("key")!; // 查询参数
  const results: ArticleType[] = useSelector(
    (state: RootState) => state.search.results
  );
  const [hasMore] = useState<boolean>(true); // 是否还有更多内容
	const [loading, setLoading] = useState<boolean>(false); // 加载状态

  // 加载更多的回调函数
  const loadMore = async () => {
		// 1.处于加载状态，停止
		if(loading) return

		// 2.开启加载
		setLoading(true);
		// 3.请求
		try {
			await dispatch(getSearchResult(key, page));
			page++;
		} finally {
			// 4.停止加载
			setLoading(false);
		}
  }

  // useEffect(() => {
  //   // 请求
  //   dispatch(getSearchResult(key, 1));
  // }, [key, dispatch]);

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar className="navBar">搜索结果</NavBar>

      <div className="article-list">
        {results.map((item: ArticleType) => {
          return (
            <div key={item.art_id}>
              <ArticleItem channelId={-1} data={item} />
            </div>
          );
        })}
      </div>

      {/* 上拉加载 */}
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </div>
  );
};

export default SearchResult;
