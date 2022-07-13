/*
 * @Author: quan
 * @Date: 2022-07-13 10:17:10
 * @LastEditors: quan
 * @LastEditTime: 2022-07-13 16:01:31
 * @Description: file content
 */
import classnames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import Icon from '../Icon'
import styles from './index.module.scss'

/**
 * 拥有懒加载特性的图片组件
 * @param {String} props.src 图片地址
 * @param {String} props.className 样式类
 */
const Image = ({ src, className }) => {
	// 记录图片加载是否出错的状态
	const [isError, setIsError] = useState(false)
	// 记录图片是否正在加载的状态
	const [isLoading, setIsLoading] = useState(true)
	// 对图片元素的引用
	const imgRef = useRef(null)

	// 创建页面执行 
	useEffect(() => {
		const obs = new IntersectionObserver(([{ isIntersecting }]) => {
			if(isIntersecting) {
				// 赋值
				imgRef.current.src = imgRef.current.dataset.src
				// 停止监听
				obs.unobserve(imgRef.current);
			}
		})

		// 开始监听
		obs.observe(imgRef.current);
	}, [])

	return (
		<div className={classnames(styles.root, className)}>
			{
				/* 正在加载时显示的内容 */
				isLoading && (
					<div className="image-icon">
						<Icon type="iconphoto" />
					</div>
				)
			}

			{
				/* 加载出错时显示的内容 */
				isError && (
					<div className="image-icon">
						<Icon type="iconphoto-fail" />
					</div>
				)
			}

			{
				/* 加载成功时显示的内容 */
				!isError && (
					<img
						alt=""
						data-src={src}
						ref={imgRef}
						onLoad={() => setIsLoading(false)}
						onError={() => setIsError(true)}
					/>
				)
			}
		</div>
	)
}

export default Image
