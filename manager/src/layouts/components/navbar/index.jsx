import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, Dropdown, Modal, Layout, Avatar, Typography } from 'antd';
import Hamburger from '@/components/Hamburger';
import { subStringStr } from '@/utils/filters';
import styles from './index.module.less';
import { CaretDownOutlined, UserOutlined } from '@ant-design/icons';
import logo from '@/assets/imgs/ant.svg';
import MenuBar from '../sidebar/Menu';
const { Header } = Layout;

const { Text } = Typography;

const NavBar = () => {
  const dispatch = useDispatch();
  const { avatar, username } = useSelector(state => state.users);
  const { sidebarStatus } = useSelector(state => state.app);
  const { layoutMode, theme = 'light' } = useSelector(state => state.settings);

  const menuClick = ({ key }) => {
    switch (key) {
      case 'logout':
        Modal.confirm({
          title: '登出',
          content: '确定要退出系统吗?',
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            dispatch.users.loginOut();
          },
        });
        break;
      default:
        break;
    }
  };

  const DropMenu = () => {
    const items = [
      { label: <Text type={'danger'}> {username}</Text>, key: 'dashboard' },
      { type: 'divider' },
      { label: '登出', key: 'logout' },
    ];

    return (
      <Menu onClick={menuClick} className={styles.userInfo} items={items} />
    );
  };

  const Logo = () => {
    console.log('123');
    return (
      <Wrapper>
        <img src={logo} className={styles.horizontalLogoImg} alt="logo" />
        <h1 className={styles.horizontalLogoTitle}>React-Ant-Admin</h1>
      </Wrapper>
    );
  };

  const HorizontalMenu = () => {
    const location = useLocation();
    const [initPath, setInitPath] = useState('');

    useEffect(() => {
      setInitPath(location.pathname);
    }, []);
    return (
      <div className={styles.horizontalMenuSection}>
        {initPath ? (
          <MenuBar initPath={initPath} mode={'horizontal'} theme={theme} />
        ) : null}
      </div>
    );
  };

  return (
    // <div className={`nav-bar-section ${!sidebarStatus ? 'open-slide' : 'close-slide'}`}>
    <div
      className={`${styles.navBarSection} ${
        !sidebarStatus ? '' : styles.closeSlide
      }`}
    >
      <Header className={`${styles.headerSection}`}>
        <HeaderWraper>
          <div className={styles.logoSection}>
            {layoutMode !== 'horizontal' ? <Hamburger /> : <Logo />}
          </div>

          {layoutMode !== 'vertical' ? <HorizontalMenu /> : null}

          <div className={styles.rightMenu}>
            <div className={styles.dropdownWrap}>
              <Dropdown overlay={DropMenu}>
                <div>
                  <Avatar
                    size={40}
                    icon={<UserOutlined />}
                    src={avatar}
                    className={styles.avatarWrapper}
                  />

                  <span className={styles.username}>
                    {subStringStr(username, 3)}
                  </span>

                  <CaretDownOutlined style={{ color: 'rgba(0,0,0,.3)' }} />
                </div>
              </Dropdown>
            </div>
          </div>
        </HeaderWraper>
      </Header>
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderWraper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
`;

export default NavBar;
