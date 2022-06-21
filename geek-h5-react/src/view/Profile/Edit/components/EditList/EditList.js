import React from 'react';
import styles from './EditList.module.scss'

const EditList = ({ config, onClose, type }) => {

    // list数据
    const list = config[type]
    // console.log(list)

    return (
        <div className={styles.root}>

            {
                list.map(item => {
                    return <div className="list-item" key={item.title} onClick={item.onClick}>{item.title}</div>
                })
            }

            <div className="list-item" onClick={onClose}>取消</div>
        </div>
    );
};

export default EditList;