import React from 'react';
import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import '@/styles/transition.less';
import styles from './main.module.less';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useSelector } from 'react-redux';

const { Content } = Layout;

const Main = props => {
  const location = useLocation();
  const { fixedHeader, tagsView } = useSelector(state => state.settings);

  return (
    <Content
      className={`${styles.mainSection} ${
        fixedHeader ? styles.fixedHeader : ''
      } ${tagsView ? styles.hasTags : styles.noTags} `}
    >
      {/* 动画 styles-transition.less => forward-from-right back-to-right fade-in fade-transform*/}
      <TransitionGroup
        className={styles.mainWrapper}
        childFactory={child =>
          React.cloneElement(child, { classNames: 'forward-from-right' })
        }
      >
        <CSSTransition timeout={500} key={location.pathname}>
          <div className={styles.mainContent}>
            <Outlet />
          </div>
        </CSSTransition>
      </TransitionGroup>
    </Content>
  );
};

export default Main;
