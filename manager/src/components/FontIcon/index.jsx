import classNames from 'classnames';
import styled from 'styled-components';

import { createFromIconfontCN } from '@ant-design/icons';

const scriptUrl = `${process.env.PUBLIC_URL + '/'}` + 'iconfont.js';
const IconFontBox = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(185, 185, 191);
  &.focus {
    color: #fff;
  }
  &.lightblue {
    color: #1dc5ff;
  }
  &.authlightblue {
    color: #1dc5ff;
  }
  &.authblack {
    color: #000;
  }
  &.authwhite {
    color: #fff;
  }
  &.authblue {
    color: #3091ff;
  }
  &.authred {
    color: #f54553;
  }
  &.authgreen {
    color: #40e384;
  }
  &.authpurple {
    color: #b247ff;
  }
  &.authyellow {
    color: #fee103;
  }
  &.authpink {
    color: #ffb6c1;
  }
  &.authorange {
    color: #ffa500;
  }
  &.authbrown {
    color: #8a3b00;
  }
  &.authgray {
    color: #808080;
  }
  &.gray {
    color: gray;
  }
  &.whitedisable {
    color: #fff;
    opacity: 0.12;
  }
`;

const IconFont = createFromIconfontCN({
  scriptUrl,
});

export const FontIcon = props => {
  const {
    children,
    className,
    name,
    size = 'default',
    rotate,
    color,
    fontSize,
    ...rest
  } = props;
  const style = {};

  if (color) style.color = color;

  switch (size) {
    case 'extra-small':
      style.fontSize = '12px';
      break;

    case 'small':
      style.fontSize = '14px';
      break;

    case 'extra-default':
      style.fontSize = '16px';
      break;

    case 'default':
      style.fontSize = '20px';
      break;

    case 'large':
      style.fontSize = '28px';
      break;

    case 'extra-large':
      style.fontSize = '32px';
      break;

    default:
      style.fontSize = '12px';
      break;
  }
  if (fontSize) style.fontSize = fontSize;

  return (
    <IconFontBox className={classNames('icon-font-icon', size, className)}>
      <IconFont
        type={`icon-${name || children}`}
        style={style}
        rotate={rotate}
        {...rest}
      />
    </IconFontBox>
  );
};
