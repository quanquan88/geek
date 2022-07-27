/*
 * @Author: quan
 * @Date: 2022-05-25 21:57:24
 * @LastEditors: quan
 * @LastEditTime: 2022-07-27 11:56:05
 * @Description: file content 
 */

/** 覆盖webpack配置 */

const { override, fixBabelImports, addWebpackAlias, addPostcssPlugins, addWebpackExternals } = require('customize-cra');
const path = require('path')
const px2viewport = require('postcss-px-to-viewport')

module.exports = override(
    // antd 按需加载
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: 'css',
    }),
    // 配置别名
    addWebpackAlias({
        '@': path.join(__dirname, 'src'),
        '@scss': path.join(__dirname, 'src/assets/style'),
    }),
    // 转化单位配置
    addPostcssPlugins([
        px2viewport({
            viewportWidth: 375,
        })
    ]),
    // 排除第三方的依赖包 节省空间
    addWebpackExternals({
        
    })
)