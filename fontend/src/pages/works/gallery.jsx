import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import { SwapLeftOutlined, SwapRightOutlined } from '@ant-design/icons';
import { Video } from '@comp';
import { getWorksList } from '@/api';
import { useData } from '@/hooks';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export const Gallery = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await getWorksList();
        if (result && result.data) {
          const { data } = result.data;
          setList(data);
        }
        console.log('getWorksList', result);
      } catch (err) {
        console.log('getWorksList err', err);
      }
    })();
  }, []);

  const onSlideChange = () => {};
  const onSwiper = swiper => {
    console.log(swiper);
  };
  const data = list.map(item => {
    return {
      title: item.name,
      src: item.picture,
    };
  });
  return (
    <Wrapper>
      <Swiper
        spaceBetween={20}
        slidesPerView={'auto'}
        // loop={true}
        modules={[Pagination, Navigation]}
        onSlideChange={onSlideChange}
        onSwiper={onSwiper}
      >
        {data.map(item => slider(item))}
        <Btns />
      </Swiper>
    </Wrapper>
  );
};

const slider = data => {
  const { title, src } = data;
  return (
    <SwiperSlide key={title}>
      <SlideWrapper>
        {/* <Img src={src} /> */}
        <Video src={src}/>
        <Name>{title}</Name>
      </SlideWrapper>
    </SwiperSlide>
  );
};

const Btns = () => {
  const swiper = useSwiper();
  const data = useData();
  return (
    <TitleWrapper>
      <Title>{data.works.title}</Title>
      <SubTitle>{data.works.subTitle}</SubTitle>
      <BtnsWrapper>
        <SwapLeftOutlined className="page-btn" onClick={() => swiper.slidePrev()} />
        <SwapRightOutlined className="page-btn" onClick={() => swiper.slideNext()} />
      </BtnsWrapper>
    </TitleWrapper>
  );
};

const Wrapper = styled.div`
  height: 40rem;
  .swiper {
    height: 100%;
  }
  .swiper-slide {
    width: 36rem;
  }
  .swiper-wrapper {
    margin-top: 6rem;
  }
`;
const SlideWrapper = styled.div`
  height: 29rem;
  width: 36rem;
  display: flex;
  /* cursor: grab; */
  flex-direction: column;
`;
// const Img = styled.div`
//   flex: 1;
//   background-image: url(${props => props.src});
//   background-position: center;
//   background-repeat: no-repeat;
//   background-size: cover;
// `;
const Name = styled.div`
  color: #fff;
  opacity: 0.8;
  font-size: 20px;
`;

const TitleWrapper = styled.div`
  position: absolute;
  top: -2rem;
  left: 0;
  right: 0;
  display: flex;
  align-items: flex-end;
  margin: 32px 0;
`;
const Title = styled.div`
  color: #fff;
  font-size: 38px;
  margin-right: 20px;
`;
const SubTitle = styled.div`
  color: #aaa;
  font-size: 22px;
`;

const BtnsWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  margin-right: 10vw;
  .page-btn {
    color: #999;
    background: #222;
    border-radius: 2rem;
    font-size: 2rem;
    padding: 6px;
    margin-left: 2rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
      color: #aaa;
      background: #666;
    }
  }
`;
