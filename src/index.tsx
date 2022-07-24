/*
 * @Author: quan
 * @Date: 2022-05-24 22:35:44
 * @LastEditors: quan
 * @LastEditTime: 2022-07-23 22:36:29
 * @Description: file content
 */
import ReactDOM from 'react-dom';
import App from './App';
// 全局样式
import '@scss/index.scss'
// store
import store from '@/store'
// react-redux
import { Provider } from 'react-redux'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'; // day中文包
dayjs.extend(relativeTime); // 插件扩展
dayjs.locale('zh-cn'); // 设置语言

// const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
  <Provider store={store}>
     <App />
  </Provider>,
  document.getElementById('root')
)
