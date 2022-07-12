/*
 * @Author: quan
 * @Date: 2022-07-11 16:22:06
 * @LastEditors: quan
 * @LastEditTime: 2022-07-12 09:46:23
 * @Description: file content
 */
import classnames from 'classnames'
import Icon from '@/components/Icon'
import styles from './index.module.scss'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
// 指定语言
import 'dayjs/locale/zh-cn';
dayjs.extend(relativeTime) // 插件扩展
dayjs.locale('zh-cn')

const ArticleItem = ({ className, data }) => {
    const { cover: {type, images} } = data
    return (
        <div className={styles.root}>
            <div
                className={classnames(
                    'article-content',
                    type === 3 ? 't3' : '',
                    type === 0 ? 'none-mt' : ''
                )}
            >
                <h3>{ data.title }</h3>
                {type !== 0 && (
                    <div className="article-imgs">
                        {images.map((item, i) => (
                            <div className="article-img-wrapper" key={i}>
                                <img src={item} alt="" />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className={classnames('article-info', type === 0 ? 'none-mt' : '')}>
                <span>{ data.aut_name }</span>
                <span>{ data.comm_count } 评论</span>
                {/* fromNow: 距离现在的时间 */}
                <span>{ dayjs(data.pubdate).fromNow() }</span>

                <span className="close">
                    <Icon type="iconbtn_essay_close" />
                </span>
            </div>
        </div>
    )
}

export default ArticleItem
