import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import styles from './index.module.less';

const Hamburger = props => {
  const { sidebarStatus } = props;
  const dispatch = useDispatch();

  const toggleClick = () => {
    dispatch.app.TOGGLE_SIDEBAR();
  };

  return (
    <div className={styles.hamburgerSection} onClick={toggleClick}>
      {sidebarStatus ? <MenuFoldOutlined className={styles.icons} /> : <MenuUnfoldOutlined className={styles.icons} />}
    </div>
  );
};

export default connect(state => state.app)(Hamburger);
