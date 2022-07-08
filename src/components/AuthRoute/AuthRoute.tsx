/*
 * @Author: quan
 * @Date: 2022-06-12 01:20:04
 * @LastEditors: quan
 * @LastEditTime: 2022-06-21 23:17:43
 * @Description: file content
 */
import React, { ComponentType } from 'react';
import {Route, Redirect, RouteProps} from "react-router-dom";
import {hasToken} from "@/utils/storage";

// 类型
interface Props extends RouteProps {
    component: ComponentType<any> // 组件类型
}

const AuthRoute = ({component: Component, ...rest}: Props) => {
    return (
        <Route
            {...rest}
            render={({location}) => {
                if (hasToken()) {
                    return <Component/>
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: {
                                    from: location.pathname
                                }
                            }}
                        />
                    )
                }
            }}
        >

        </Route>
    );
};

export default AuthRoute;