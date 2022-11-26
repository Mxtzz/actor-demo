import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Modal, Typography, Space } from 'antd';

const { Title, Paragraph } = Typography;

export const DetailModal = props => {
  const { detail, onClose } = props;

  const descList = detail
    ? [
        {
          title: '姓名',
          value: detail.starName,
        },
        {
          title: '年龄',
          value: detail.starAge + '岁',
        },
        {
          title: '身高',
          value: detail.starHeight + 'cm',
        },
        {
          title: '体重',
          value: detail.starWeight + 'kg',
        },
        {
          title: '生日',
          value: moment(detail.starDate).format('YYYY-MM-DD'),
        },
        {
          title: '语言',
          value: detail.starLanguage,
        },
        {
          title: '爱好',
          value: detail.starHobby,
        },
        {
          title: '民族',
          value: detail.starNation,
        },
        {
          title: 'certify',
          value: detail.certify,
        },
        // {
        //   title: 'cooperation',
        //   value: detail.cooperation,
        // },
        {
          title: 'createBy',
          value: detail.createBy,
        },
        {
          title: 'createTime',
          value: detail.createTime,
        },
        {
          title: 'experience',
          value: detail.experience,
        },
        {
          title: 'starBriefIntroduction',
          value: detail.starBriefIntroduction,
        },
        {
          title: 'updateTime',
          value: detail.updateTime,
        },
        {
          title: 'starRepresentativeWork',
          value: detail.starRepresentativeWork,
        },
      ]
    : [];

  return (
    <Modal
      title="详细信息"
      open={!!detail}
      maskClosable={false}
      centered={true}
      bodyStyle={{
        maxHeight: '70vh',
        overflowY: 'auto',
      }}
      width={800}
      footer={null}
      onCancel={onClose}
    >
      <Wrapper>
        {descList.map(item => (
          <React.Fragment key={item.title}>
            <Space>
              <Title level={5} style={{ margin: 0, fontWeight: 600 }}>
                {item.title}
              </Title>
              <Title level={5} style={{ margin: 0, fontWeight: 400 }}>
                {item.value}
              </Title>
            </Space>
            <br />
          </React.Fragment>
        ))}
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled.div``;
