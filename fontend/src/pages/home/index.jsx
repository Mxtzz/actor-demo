import { useState } from 'react';
import styled from 'styled-components';
import { Layout } from './layout';
import { More } from './more';
import { SearchInput } from './search';
import { List } from './list';

export const Home = () => {
  const [ name, setName ] = useState();
  return (
    <Wrapper>
      <Layout search={<SearchInput onSearch={v => setName(v)} />} list={<List name={name} />} more={<More />} />
    </Wrapper>
  );
};

const Wrapper = styled.div``;
