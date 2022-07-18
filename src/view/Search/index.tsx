/*
 * @Author: quan
 * @Date: 2022-07-15 17:44:48
 * @LastEditors: quan
 * @LastEditTime: 2022-07-18 15:38:03
 * @Description: file content
 */

import Icon from '@/components/Icon'
import NavBar from '@/components/NavBar'
import { RootState } from '@/store'
import { getSuggestions } from '@/store/action/search'
import classnames from 'classnames'
import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styles from './index.module.scss'

const Search = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState<string>('');
  const timeRef = useRef<number>(-1);
  // 推荐搜索列表
  const suggestions = useSelector((state: RootState) => state.search.suggertions);

  // 搜索框改变触发
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setKeyword(val);

    // 防抖
    // 1.清除上一次的定时器
    clearTimeout(timeRef.current);
    // 2.定时器请求
    timeRef.current = window.setTimeout(() => {
      // 发起请求
      dispatch(getSuggestions(val))
      // console.log("请求：", val);
    }, 500)
  }

  useEffect(() => {
    return () => {
      // 销毁触发
      // 3.组件销毁，销毁定时器
      clearTimeout(timeRef.current);
    }
  }, [])

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar
        className="navbar"
        onLeftClick={() => history.go(-1)}
        subtitle={
          <span className="search-text">搜索</span>
        }
      >
        <div className="navbar-search">
          <Icon type="iconbtn_search" className="icon-search" />

          <div className="input-wrapper">
            {/* 输入框 */}
            <input 
              type="text" 
              placeholder="请输入关键字搜索" 
              value={keyword}
              onChange={onChange}
            />

            {/* 清空输入框按钮 */}
            <Icon type="iconbtn_tag_close" className="icon-close" />
          </div>
        </div>
      </NavBar>

      {/* 搜索历史 */}
      <div className="history" style={{ display: 'block' }}>
        <div className="history-header">
          <span>搜索历史</span>
          <span>
            <Icon type="iconbtn_del" />清除全部
          </span>
        </div>

        <div className="history-list">
          <span className="history-item">
            Python生成九宫格图片<span className="divider"></span>
          </span>
          <span className="history-item">
            Python<span className="divider"></span>
          </span>
          <span className="history-item">
            CSS<span className="divider"></span>
          </span>
          <span className="history-item">
            数据分析<span className="divider"></span>
          </span>
        </div>
      </div>

      {/* 搜素建议结果列表 */}
      <div className={classnames('search-result', 'show')}>
        {
          suggestions.map((item, i) => (
            <div className="result-item" key={i}>
              <Icon className="icon-search" type="iconbtn_search" />
              <div className="result-value">
                {item}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Search
