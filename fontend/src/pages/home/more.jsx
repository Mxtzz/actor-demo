import styled from 'styled-components';
import { useData } from '@/hooks';

export const More = () => {
  const {
    home: {
      more: { title, link },
    },
  } = useData();
  return <Wrapper href={link || '#'}>{title}</Wrapper>;
};

const Wrapper = styled.a`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 64px;
  color: #ddd;
  &:hover {
    color: #eee;
  }
`;
