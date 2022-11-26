import { useState } from 'react';
import styled from 'styled-components';
import { COLOR } from '@config/constant';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export const ListItem = props => {
  const { id, works, name } = props;
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const onClick = id => {};

  return (
    <ItemWrapper onClick={() => onClick(id)}>
      <Swiper
        className="max-swiper"
        modules={[Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
      >
        {works.map(item => slider(item))}
      </Swiper>
      <TitleWrapper>
        <Title>{name}</Title>
      </TitleWrapper>
      <ThumbsWrapper>
        <Swiper
          className="thumb-swiper"
          modules={[Thumbs]}
          slidesPerView={4}
          watchSlidesProgress
          onSwiper={setThumbsSwiper}
        >
          {works.map(item => thumbs(item))}
        </Swiper>
      </ThumbsWrapper>
    </ItemWrapper>
  );
};

const slider = data => {
  const { id, picture } = data;
  return (
    <SwiperSlide key={id}>
      <SlideWrapper>
        <Img src={picture} />
      </SlideWrapper>
    </SwiperSlide>
  );
};

const thumbs = data => {
  const { id, picture } = data;
  return (
    <SwiperSlide key={id}>
      <ThumbWrapper>
        <ThunbImg className="thumb-img" src={picture} />
      </ThumbWrapper>
    </SwiperSlide>
  );
};

const ItemWrapper = styled.div`
  position: relative;
  height: 26rem;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 10px;
  transition: box-shadow 0.2s ease-in-out;
  user-select: none;
  &:hover {
    box-shadow: 0 0 10px #ddd;
  }
  .max-swiper {
    height: 20rem;
    width: 100%;
  }
  .thumb-swiper {
    height: 3rem;
    width: 100%;
    .swiper-wrapper {
      display: flex;
      justify-content: center;
    }
  }
  .swiper-slide {
    display: flex;
    justify-content: center;
  }
  .swiper-slide-thumb-active .thumb-img{
    border: 1px solid ${COLOR.HomeLeft};
  }
`;

const SlideWrapper = styled.div`
  height: 100%;
  width: 100%;
  cursor: pointer;
`;

const ThumbsWrapper = styled.div`
  padding: 0 14%;
`;

const ThumbWrapper = styled.div`
  height: 3rem;
  width: 2rem;
`;

const TitleWrapper = styled.div`
  padding: 10px;
`;

const Title = styled.div`
  font-size: 1rem;
  text-align: center;
  transition: all 0.3 ease-in-out;
  cursor: pointer;
  &:hover {
    color: ${COLOR.HomeLeft};
  }
`;

const Img = styled.div`
  height: 100%;
  width: 100%;
  background-image: url(${props => props.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const ThunbImg = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid #aaa;
  background-image: url(${props => props.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
`;
