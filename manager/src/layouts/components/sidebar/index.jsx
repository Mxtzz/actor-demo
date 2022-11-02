import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import Logo from './Logo';
import Menus from './Menu';

const { Sider } = Layout;

const LayoutSider = () => {
  const location = useLocation();
  const sidebarStatus = useSelector(state => state.settings.sidebarStatus);
  const [initPath, setInitPath] = React.useState('');

  React.useEffect(() => {
    setInitPath(location.pathname);
  }, []);

  return (
    <Sider
      trigger={null}
      collapsible
      className={'sidebar-section'}
      collapsed={sidebarStatus}
      style={{ zIndex: '10' }}
    >
      <Logo />
      {initPath ? <Menus initPath={initPath} /> : null}
    </Sider>
  );
};

export default LayoutSider;
