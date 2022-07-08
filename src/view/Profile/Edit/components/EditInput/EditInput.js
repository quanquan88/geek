import React, {useState} from 'react';
import NavBar from "@/components/NavBar";
// 样式
import styles from './EditInput.module.scss'
// 文本框
import Textarea from "@/components/Textarea/Textarea";
import CuInput from "@/components/CuInput";
import {useSelector} from "react-redux";

const EditInput = ({onClose, type, onCommit}) => {

    // 类型字典
    const typeDict = {
        name: '昵称',
        intro: '简介'
    }

    // 获取回显的值
    const defaultVal = useSelector(state => state.profile.profile[type])

    // 控制表单的值
    const [val, setVal] = useState(defaultVal || '')

    return (
        <div className={styles.root}>
            {/* 导航栏 */}
            <NavBar
                onLeftClick={onClose}
                subtitle={<span className="submit-btn" onClick={() => onCommit(type, val)}>提交</span>}
            >
                编辑{typeDict[type]}
            </NavBar>
            <div className="edit_content">
                {/* 标题 */}
                <h3>{typeDict[type]}</h3>

                {/* 表单区域 */}
                {
                    type === 'name' ? (
                        <CuInput
                            autoFocus
                            value={val}
                            className="input-wrap"
                            onChange={e => setVal(e.target.value)}
                        />
                    ) : (
                        <Textarea
                            autoFocus
                            value={val}
                            onChange={e => setVal(e.target.value)}
                            maxLength={200}
                            placeholder={'请输入简介'}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default EditInput;