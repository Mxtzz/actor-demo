import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import styles from './index.module.less';

const Hamburger = props => {
  const dispatch = useDispatch();
  const sidebarStatus = useSelector(state => state.app.sidebarStatus);

  const toggleClick = () => {
    dispatch.app.TOGGLE_SIDEBAR();
  };

  return (
    <div className={styles.hamburgerSection} onClick={toggleClick}>
      {sidebarStatus ? <MenuFoldOutlined className={styles.icons} /> : <MenuUnfoldOutlined className={styles.icons} />}
    </div>
  );
};

export default Hamburger;
