import { useEffect } from 'react';

export const useData = () => {
  useEffect(() => {}, []);

  return {
    home: {
      title: {
        main: '干净又卫生',
        subTitle: '一点寒芒先到，随后枪出如龙',
        desc: 'It is your responsibility to ensure that custom players keep up with any internal changes to ReactPlayer in later versions.',
      },
      c1: 'https://img2.baidu.com/it/u=3979018315,3535783819&fm=253&fmt=auto&app=138&f=JPEG',
      video: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
      more: {
        title: '更多信息',
        link: '/works',
      },
    },
    works: {
      title: '代表作',
      subTitle: '刘庸干净又卫生',
    },
  };
};
