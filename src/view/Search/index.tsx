/*
 * @Author: quan
 * @Date: 2022-07-15 17:44:48
 * @LastEditors: quan
 * @LastEditTime: 2022-07-22 10:40:37
 * @Description: file content
 */

import Icon from '@/components/Icon'
import NavBar from '@/components/NavBar'
import { RootState } from '@/store'
import { addSearchList, clearSearchList, clearSuggestions, getSuggestions } from '@/store/action/search'
import classnames from 'classnames'
import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styles from './index.module.scss'
import { Dialog, Toast } from 'antd-mobile-v5'

const Search = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState<string>('');
  const timeRef = useRef<number>(-1);
  // 推荐搜索列表
  const {suggertions,histories} = useSelector((state: RootState) => state.search);
  const [isSearching, setIsSearching] = useState<boolean>(false); // 是否处于搜索状态

  // 搜索框改变触发
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    setKeyword(val);

    // 防抖
    // 1.清除上一次的定时器
    clearTimeout(timeRef.current);
    // 2.定时器请求
    timeRef.current = window.setTimeout(() => {
      // 发起请求
      if(val) {
        // 搜索状态
        setIsSearching(true);
        // 请求
        dispatch(getSuggestions(val));
      } else {
        setIsSearching(false);
      }
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

  // 指定高亮
  const hightLight = (str: string, key: string) => {
    // 匹配的正则
    const reg = new RegExp(key, 'gi');
    // 替换字符串
    const val = str.replace(reg, (match: string) => {
      return `<span style="color: red">${match}</span>`;
    })

    return val
  }

  // 清空
  const onClear = () => {
    // 清空搜索
    setKeyword('');
    // 关闭搜索状态
    setIsSearching(false);
    // 清空redux
    dispatch(clearSuggestions());
  }

  // 点击搜索
  const onSearch = (key: string) => {
    if(!key) return;
    dispatch(addSearchList(key))

    // 跳转
    history.push(`/search/result?key=${key}`)
  }

  // 点击清空全部历史
  const onClearHistories = () => {    
    Dialog.confirm({
      title: "提示",
      content: "是否确认删除?",
      async onConfirm() {
        // 清除
        await dispatch(clearSearchList())
        // console.log("成功");
        Toast.show({
          content: "清除成功",
          maskClickable: false,
          duration: 1000
        })
      }
    })
  }

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar
        className="navbar"
        onLeftClick={() => history.go(-1)}
        subtitle={
          <span className="search-text" onClick={() => onSearch(keyword)}>搜索</span>
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
            <Icon type="iconbtn_tag_close" className="icon-close" onClick={onClear} />
          </div>
        </div>
      </NavBar>

      {/* 搜索历史 */}
      <div className="history" style={{ display: isSearching ? 'none' : 'block' }}>
        <div className="history-header">
          <span>搜索历史</span>
          <span onClick={onClearHistories}>
            <Icon type="iconbtn_del" />清除全部
          </span>
        </div>

        <div className="history-list">
          {
            histories.map((item: string, index: number) => {
              return (
                <span className="history-item" key={index} onClick={() => onSearch(item)}>
                  { item }<span className="divider"></span>
                </span>
              )
            })
          }
        </div>
      </div>

      {/* 搜素建议结果列表 */}
      <div className={classnames('search-result', {'show': isSearching})}>
        {
          suggertions.map((item, i) => (
            <div className="result-item" key={i} onClick={() => onSearch(item)}>
              <Icon className="icon-search" type="iconbtn_search" />
              <div 
                className="result-value"
                dangerouslySetInnerHTML={{
                  __html: hightLight(item, keyword)
                }}
              ></div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Search
