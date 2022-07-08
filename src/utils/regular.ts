/*
 * @Author: quan
 * @Date: 2022-06-01 23:30:10
 * @LastEditors: quan
 * @LastEditTime: 2022-07-08 11:11:14
 * @Description: file content
 */

// 校验手机号码
export const isMobile = (mobile: string): boolean => {
    const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;

    return reg.test(mobile)
}
