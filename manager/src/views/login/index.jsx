import React, { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className={`${styles.loginContainer} un-select`}>
      <div className={`${styles.body} ${styles.fixWidth}`}>
        <div className={styles.top}>
          <Logo className={styles.logos} />
          <div className={styles.desc}> {'sub title'}</div>
        </div>
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
      </div>
    </div>
  );
};

export default Login;
