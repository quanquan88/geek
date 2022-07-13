/*
 * @Author: quan
 * @Date: 2022-07-13 14:48:36
 * @LastEditors: quan
 * @LastEditTime: 2022-07-13 16:58:06
 * @Description: file content
 */
import Icon from '@/components/Icon'
import { reportArticle, setMoreAction, unlinkArticle } from '@/store/action/home'
import { Modal, Toast } from 'antd-mobile'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'

/**
 * 举报反馈菜单
 */
const FeedbackActionMenu = () => {

	// 举报类型：normal 不感兴趣或拉黑作者 | junk 垃圾内容
	const [type, setType] = useState('normal')
	const moreAction = useSelector(state => state.home.moreAction); // 更多弹框信息
	const dispatch = useDispatch();
	// 垃圾类型
	const junkList = [
		{ key: 0, title: '其他问题' },
		{ key: 1, title: '标题夸张' },
		{ key: 2, title: '低俗涩情' },
		{ key: 3, title: '错别字多' },
		{ key: 4, title: '旧闻重复' },
		{ key: 5, title: '广告软文' },
		{ key: 6, title: '内容不适' },
		{ key: 7, title: '涉嫌违法' },
		{ key: 8, title: '侵权' },
	]

	// 关闭弹框时的事件监听函数
	const onClose = () => {
		dispatch(setMoreAction({
			visible: false,
			articleId: '',
			channelId: 0
		}))
	}

	// 点击不感兴趣
	const handleUnlike = async () => {
		// 1.请求
		await dispatch(unlinkArticle(moreAction.articleId));
		// 2.成功提示
		Toast.info('屏蔽成功', 1);
		// 3.关闭弹框
		onClose()
	}
	// 点击举报
	const handleReport = async (reportId) => {
		await dispatch(reportArticle(moreAction.articleId, reportId))
		onClose();
		Toast.info('举报成功', 1);
		setType('normal')
	}

	return (
		<div className={styles.root}>
			<Modal
				className="more-action-modal"
				title=""
				transparent
				maskClosable
				footer={[]}
				onClose={onClose}
				visible={moreAction.visible}
			>
				<div className="more-action">
					{/* normal 类型时的菜单内容 */}
					{type === 'normal' && (
						<>
							<div className="action-item" onClick={handleUnlike}>
								<Icon type="iconicon_unenjoy1" /> 不感兴趣
							</div>
							<div className="action-item" onClick={() => setType('junk')}>
								<Icon type="iconicon_feedback1" />
								<span className="text">反馈垃圾内容</span>
								<Icon type="iconbtn_right" />
							</div>
							<div className="action-item">
								<Icon type="iconicon_blacklist" /> 拉黑作者
							</div>
						</>
					)}

					{/* junk 类型时的菜单内容 */}
					{type === 'junk' && (
						<>
							<div className="action-item" onClick={() => setType('normal')}>
								<Icon type="iconfanhui" />
								<span className="back-text">反馈垃圾内容</span>
							</div>
							{
								junkList.map(item => {
									return (
										<div className="action-item" key={item.key} onClick={() => handleReport(item.key)} >{ item.title }</div>
									)
								})
							}
						</>
					)}
				</div>
			</Modal>
		</div>
	)
}

export default FeedbackActionMenu
