import styled from 'styled-components';
import logo from '@/assets/imgs/ant.svg';
import styles from './index.module.less';

const Logo = () => {
  return (
    <Wrapper className={styles.sidebarLogoWrapper}>
      <img src={logo} className={styles.sidebarLogo} alt="logo" />
      <p className={styles.sidebarTitle}>React-Ant-Admin</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  height: 48px;
  img {
    height: 32px;
    width: 32px;
  }
  p {
    line-height: 48px;
    margin: 0;
    margin-left: 8px;
  }
`;

export default Logo;
