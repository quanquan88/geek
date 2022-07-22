/*
 * @Author: quan
 * @Date: 2022-07-22 10:45:21
 * @LastEditors: quan
 * @LastEditTime: 2022-07-22 14:26:56
 * @Description: file content
 */

import ArticleItem from '@/view/Home/components/ArtItem'
import NavBar from '@/components/NavBar'
import { RootState } from '@/store'
import { getSearchResult } from '@/store/action/search'
import { ArticleType } from '@/store/types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import styles from './index.module.scss'

const SearchResult = () => {
	const location = useLocation()
	const dispatch = useDispatch()
	const search: URLSearchParams = new URLSearchParams(location.search); // 查询参数对象
	const key: string = search.get('key')!; // 查询参数
	const results: ArticleType[] = useSelector((state: RootState) => state.search.results);

	useEffect(() => {
		// 请求
		dispatch(getSearchResult(key, 1))
	}, [key, dispatch])
	
	return (
		<div className={styles.root}>
			{/* 顶部导航栏 */}
			<NavBar>搜索结果</NavBar>

			<div className="article-list">
				{
					results.map((item: ArticleType) => {
						return (
							<div key={item.art_id}>
								<ArticleItem
									channelId={-1}
									data={item}
								/>
							</div>
						)
					})
				}
			</div>
		</div>
	)
}

export default SearchResult
