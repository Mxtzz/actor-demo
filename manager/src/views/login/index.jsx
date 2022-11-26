import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import styles from './index.module.less';
import { Spin } from 'antd';
import Logo from './logo';
import PasswordLogin from './passwordLogin';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    document.title = '登录';
  }, []);

  const loginStart = () => {
    setLoading(true);
  };

  const loginSuccess = async () => {
    navigate('/');
  };
  const loginFailed = () => {
    setLoading(false);
  };

  return (
    <Wrapper>
      <Container>
        <Top>
          <Logo />
        </Top>
        <div className={styles.main}>
          <Spin spinning={loading} tip={'loading'}>
            <PasswordLogin
              loginFailed={loginFailed}
              loginSuccess={loginSuccess}
              loginStart={loginStart}
            />
          </Spin>
        </div>
        <div className={styles.footer}>
          <div className={styles.desc} />
        </div>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  height: 400px;
  width: 400px;
`;
const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export default Login;
