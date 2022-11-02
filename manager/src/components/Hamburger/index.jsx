import { useDispatch, useSelector } from 'react-redux';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import styles from './index.module.less';

export const Hamburger = () => {
  const dispatch = useDispatch();
  const sidebarStatus = useSelector(state => state.app.sidebarStatus);

  const toggleClick = () => {
    dispatch.app.toggleSidebar();
  };

  return (
    <div className={styles.hamburgerSection} onClick={toggleClick}>
      {sidebarStatus ? (
        <MenuFoldOutlined className={styles.icons} />
      ) : (
        <MenuUnfoldOutlined className={styles.icons} />
      )}
    </div>
  );
};
