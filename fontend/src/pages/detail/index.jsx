import { DetailLayout } from './layout';
import { Gallery } from './gallery';
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
        }
        setLoading(false);
        console.log('getDetail', result);
      }
    })();
    return () => {
      setDetail({});
      setLoading(true);
    };
  }, [location]);

  return (
    <>
      <DetailLayout loading={loading} gallery={<Gallery list={detail.works} />} detail={detail} />;
    </>
  );
};
