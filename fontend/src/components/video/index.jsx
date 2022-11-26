import styled from 'styled-components';
import ReactPlayer from 'react-player/lazy';
import { useEffect, useState } from 'react';
import { PlayCircleOutlined } from '@ant-design/icons';

export const Video = props => {
  const { src } = props;
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    // setPlaying(true);
    return () => {
      setPlaying(false);
    };
  }, [src]);

  const onReady = v => {
    console.log('video', v);
  };

  const onPlayClick = () => {
    setPlaying(true);
  };

  return (
    <Wrapper>
      <ReactPlayer
        className="home-video"
        url={src}
        playing={playing}
        onReady={onReady}
        height={'100%'}
        width={'100%'}
      />
      {!playing && <PlayCircleOutlined className="play-btn" onClick={onPlayClick} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: #eee;
  position: relative;
  .home-video {
    height: 100%;
    width: 100%;
  }
  .play-btn {
    position: absolute;
    top: calc(50% - 2.5rem);
    left: calc(50% - 2.5rem);
    font-size: 5rem;
    color: #fff;
    cursor: pointer;
  }
`;
