/*
 * @Author: quan
 * @Date: 2022-05-24 22:35:44
 * @LastEditors: quan
 * @LastEditTime: 2022-05-26 22:35:22
 * @Description: file content
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// 全局样式
import '@scss/index.scss'

// store
import store from '@/store'
// react-redux
import { Provider } from 'react-redux'

// const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
  <Provider store={store}>
     <App />
  </Provider>,
  document.getElementById('root')
)
