/*
 * @Author: quan
 * @Date: 2022-07-11 16:22:06
 * @LastEditors: quan
 * @LastEditTime: 2022-07-11 17:59:59
 * @Description: file content
 */
import classnames from 'classnames'
import Icon from '@/components/Icon'
import styles from './index.module.scss'

const ArticleItem = ({ className, data }) => {
    // console.log(data);
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
                <span>{ data.pubdate }</span>

                <span className="close">
                    <Icon type="iconbtn_essay_close" />
                </span>
            </div>
        </div>
    )
}

export default ArticleItem
