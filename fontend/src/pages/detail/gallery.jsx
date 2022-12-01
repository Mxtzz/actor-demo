import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export const Gallery = props => {
  const [list, setList] = useState([]);

  useEffect(() => {
    props.list && setList(props.list);
  }, [props.list]);

  const onSlideChange = () => {};
  const onSwiper = swiper => {
    // console.log(swiper);
  };
  const data = list.map(item => {
    return {
      id: item.id,
      title: item.name,
      src: item.src,
    };
  });
  return (
    <Wrapper>
      <Swiper
        slidesPerView={1}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        speed={300}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          el: '.swiper-pagination',
          type: 'bullets',
        }}
        onSlideChange={onSlideChange}
        onSwiper={onSwiper}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
      >
        {data.map(item => slider(item))}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>
      <div className="swiper-pagination"></div>
    </Wrapper>
  );
};

const slider = data => {
  const { id, src } = data;
  return (
    <SwiperSlide key={id}>
      <SlideWrapper>
        <Img src={src} />
      </SlideWrapper>
    </SwiperSlide>
  );
};

const Wrapper = styled.div`
  position: relative;
  height: 26rem;
  width: 24rem;
  display: flex;
  justify-content: center;
  .swiper-slide {
    height: 26rem;
    width: 24rem;
  }
  .swiper-button-prev,
  .swiper-button-next {
    color: #aaa;
    transition: all 0.2s ease-in-out;
    &:hover {
      color: #ddd;
    }
  }
  .swiper-pagination {
    bottom: -3rem;
  }
  .swiper-pagination-bullet {
    width: 2rem;
    height: 0.3rem;
    background: #aaa;
    border-radius: 20px;
  }
`;
const SlideWrapper = styled.div`
  height: 26rem;
  width: 24rem;
  display: flex;
  cursor: grab;
  flex-direction: column;
  margin: 0 20px;
`;
const Img = styled.div`
  flex: 1;
  background-image: url(${props => props.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Image = ({ src }) => {
  return (
    <SlideWrapper>
      <Img src={src} />
    </SlideWrapper>
  );
};
