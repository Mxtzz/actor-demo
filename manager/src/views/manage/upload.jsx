import { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { useEffect } from 'react';
import axios from 'axios';

const beforeUpload = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};
export const UploadImg = props => {
  const { img, getImgSrc = () => {} } = props;
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    setImageUrl(img);
  }, [img]);

  useEffect(() => {
    getImgSrc(imageUrl);
  }, [imageUrl]);

  const customRequest = async v => {
    const formData = new FormData();
    formData.append('file', v.file);
    try {
      setLoading(true);
      const result = await axios.post(v.action, formData, {
        'Content-Type': 'multipart/form-data',
      });
      if (result.status === 200 && result.data?.data) {
        setImageUrl(result.data?.data);
      }
    } catch (err) {
      message.error('图片上传失败');
      console.error(err);
    }
    setLoading(false);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        上传
      </div>
    </div>
  );

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action={process.env.API_SERVER + '/star/upload'}
      customRequest={customRequest}
      beforeUpload={beforeUpload}
    >
      {imageUrl ? (
        <div
          alt="avatar"
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${imageUrl})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
          }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};
