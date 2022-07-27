/*
 * @Author: quan
 * @Date: 2022-07-25 16:42:40
 * @LastEditors: quan
 * @LastEditTime: 2022-07-26 09:03:23
 * @Description: file content
 */
import throttle from 'lodash/fp/throttle'; // 节流
import { ReactElement, useEffect, useRef } from 'react'
import styles from './index.module.scss'

interface PropsType {
    offset?: number;
    children: string | ReactElement;
}

/**
 * 吸顶组件
 * @param {HTMLElement} props.root 滚动容器元素 
 * @param {HTMLElement} props.offset 吸顶位置的 top 值
 * @param {HTMLElement} props.children 本组件的子元素  
 */
const Sticky = ({ offset = 0, children }: PropsType) => {
  const placeholderRef = useRef<HTMLDivElement>(null);  
  const containerRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    // 换算得到offset 公式：offset / 375 = x / 当前的屏幕宽度
    const offsetVal = offset / 375 * document.documentElement.clientWidth;

    const placeholderDOM = placeholderRef.current!;
    const containerDOM = containerRef.current!;

    // 滚动事件监听函数
    const onScroll = throttle(60, () => {
      // 获取占位元素的 top 位置
      const { top } = placeholderDOM.getBoundingClientRect()

      // 占位元素的 top 值已达到吸顶位置
      if (top <= offsetVal) {
        // 将要吸顶的容器元素设置成 fixed 固定定位
        containerDOM.style.position = 'fixed';
        containerDOM.style.top = `${offsetVal}px`;
        // 等于内容元素的高，防止脱离文档流失去高度
        placeholderDOM.style.height = `${containerDOM.offsetHeight}px`;
      } else {
        // 取消固定定位
        containerDOM.style.position = 'static'
        placeholderDOM.style.height = '0px'
      }
    })

    // 添加事件监听
    window.addEventListener('scroll', onScroll);

    return () => {
      // 注销事件监听
      window.removeEventListener('scroll', onScroll)
    }
  }, [offset])

  return (
    <div className={styles.root}>
      {/* 占位元素 */}
      <div ref={placeholderRef} className="sticky-placeholder" />

      {/* 吸顶显示的元素 */}
      <div className="sticky-container" ref={containerRef}>
        {children}
      </div>
    </div>
  )
}

export default Sticky
