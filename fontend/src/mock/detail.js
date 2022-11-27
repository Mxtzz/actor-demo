import Mock from 'mockjs';
import { getParams } from '../api';
const { Random } = Mock;

// 数据
const data = {
  certify: Random.integer(1, 99),
  cooperation: {},
  createBy: '',
  createTime: Date.now(),
  experience: [
    {
      img: Random.image(),
      url: 'http://www.baidu.com',
      title: '百度1',
    },
    {
      img: Random.image(),
      url: 'http://www.baidu.com',
      title: '百度2',
    },
  ],
  id: Random.integer(24),
  sort: 1,
  starAge: Random.integer(1, 99),
  starBriefIntroduction: Random.cparagraph(),
  starDate: Date.now(),
  starHeight: Random.integer(100, 199).toString(),
  starHobby: Random.cparagraph(),
  starImg: Random.image(),
  starImgs: Random.image(),
  starLanguage: 'Chinese',
  starMasterImg: Random.image(),
  starMasterVideo: Random.image(),
  starName: Random.cname(),
  starNation: Random.province(),
  starRepresentativeWork: Random.cparagraph(),
  starWeight: Random.integer(1, 99),
  updateTime: Date.now(),
};

// for (let i = 0; i < Random.integer(0, 4); i++) {
//   data.works.push({
//     id: Random.integer(24).toString(),
//     picture: Random.image(),
//     title: Random.cparagraph(3, 20),
//   });
// }

export const detail = {
  data: _ => {
    const params = getParams(_.url);
    if (!params.id) {
      return {
        code: 200,
        message: 'failed',
        data: {},
      };
    }
    data.id = params.id;
    return {
      code: 200,
      message: 'success',
      data,
    };
  },
};

// CREATE TABLE `star_info`
// (
//     `id`                       bigint                                  NOT NULL AUTO_INCREMENT COMMENT 'id',
//     `star_name`                varchar(32) COLLATE utf8mb4_general_ci  NOT NULL DEFAULT '' COMMENT '明星姓名',
//     `star_height`              varchar(8) COLLATE utf8mb4_general_ci   NOT NULL DEFAULT '' COMMENT '身高',
//     `star_weight`              varchar(8) COLLATE utf8mb4_general_ci   NOT NULL DEFAULT '' COMMENT '体重',
//     `star_age`                 varchar(8) COLLATE utf8mb4_general_ci   NOT NULL DEFAULT '0' COMMENT '年龄',
//     `star_nation`              varchar(32) COLLATE utf8mb4_general_ci  NOT NULL DEFAULT '' COMMENT '民族',
//     `star_date`                datetime                                         DEFAULT NULL COMMENT '出生日期',
//     `star_language`            text COLLATE utf8mb4_general_ci COMMENT '语言',
//     `star_hobby`               text COLLATE utf8mb4_general_ci COMMENT '爱好',
//     `sort`                     int                                     NOT NULL DEFAULT '0' COMMENT '排序',
//     `experience`               json                                             DEFAULT NULL COMMENT '演员经历',
//     `cooperation`              json                                             DEFAULT NULL COMMENT '合作信息',
//     `star_master_img`          varchar(128) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '演员主页c位图片',
//     `star_master_video`        varchar(128) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '演员主页视频',
//     `star_brief_introduction`  varchar(500) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '演员主页简介',
//     `star_representative_work` text COLLATE utf8mb4_general_ci COMMENT '演员代表作',
//     `star_img`                 varchar(258) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '演员介绍页面头像',
//     `star_imgs`                text COLLATE utf8mb4_general_ci COMMENT '演员详情页轮播图',
//     `certify`                  tinyint                                 NOT NULL DEFAULT '0' COMMENT '是否认证',
//     `create_time`              timestamp                               NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     `update_time`              timestamp                               NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//     `create_by`                varchar(32) COLLATE utf8mb4_general_ci  NOT NULL DEFAULT '' COMMENT '操作人',
//     PRIMARY KEY (`id`)
// ) ENGINE = InnoDB
//   AUTO_INCREMENT = 2
//   DEFAULT CHARSET = utf8mb4
//   COLLATE = utf8mb4_general_ci COMMENT ='明星信息'
