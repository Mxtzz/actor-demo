import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { DownOutlined } from '@ant-design/icons';
import {
  Avatar,
  Dropdown,
  message,
  Space,
  Modal,
  Layout,
  Typography,
} from 'antd';
import { CaretDownOutlined, UserOutlined } from '@ant-design/icons';
import logo from '@/assets/imgs/ant.svg';
import { subStringStr } from '@/utils/filters';

const { Header } = Layout;
const { Text } = Typography;

const NavBar = () => {
  const dispatch = useDispatch();
  const { username, avatar } = useSelector(state => state.users);

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

  const items = [
    {
      label: <Text> {username}</Text>,
      key: 'dashboard',
    },
    {
      label: '退出登录',
      key: 'logout',
      danger: true,
    },
  ];

  return (
    <Header>
      <HeaderWrapper>
        <div></div>
        <Dropdown
          menu={{
            items,
            onClick: menuClick,
          }}
          placement="bottomRight"
        >
          <UserInfo onClick={e => e.preventDefault()}>
            <Space>
              <Avatar size={40} icon={<UserOutlined />} src={avatar} />
              <UserName>{subStringStr(username, 3)}</UserName>
            </Space>
          </UserInfo>
        </Dropdown>
      </HeaderWrapper>
    </Header>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const UserInfo = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  max-width: 160px;
`;

const UserName = styled.div`
  user-select: none;
  cursor: pointer;
  color: #fff;
`;

export default NavBar;
