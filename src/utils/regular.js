/*
 * @Author: quan
 * @Date: 2022-06-01 23:30:10
 * @LastEditors: quan
 * @LastEditTime: 2022-06-01 23:31:12
 * @Description: file content
 */

export const isMobile = (mobile) => {
    const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/

    return reg.test(mobile)
}
