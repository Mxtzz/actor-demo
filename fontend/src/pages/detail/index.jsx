import { DetailLayout } from './layout';
import { Image } from './gallery';
import { useState, useEffect } from 'react';
import { getParams, getDetail } from '@/api';
import { useLocation } from 'react-router-dom';

export const Detail = () => {
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState({});
  const location = useLocation();

  useEffect(() => {
    (async () => {
      const param = getParams(location.search);
      if (param.id) {
        const result = await getDetail(param.id);
        if (result && result.data) {
          setDetail(result.data);
          console.log('getDetail', result.data);
        }
        setLoading(false);
      }
    })();
    return () => {
      setDetail({});
      setLoading(true);
    };
  }, [location]);

  const gallery = [
    {
      id: detail.id + 1,
      title: detail.starName,
      src: detail.starMasterImg,
    },
  ];

  return (
    <>
      <DetailLayout
        loading={loading}
        gallery={
          // <Gallery list={gallery} />
          <Image src={gallery[0].src} />
        }
        detail={detail}
      />
      ;
    </>
  );
};
