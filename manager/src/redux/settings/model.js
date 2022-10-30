import { createModel } from '@rematch/core';
import { effects } from './effects';
import defaultSettings from '@/defaultSettings';
import { getCookie, addCookie } from '@/utils/cookies';
const { showSettings, sidebarLogo, fixedHeader, tagsView, layoutMode } = defaultSettings;
const localLayoutMode = getCookie('layoutMode');

const initState = {
  showSettings,
  fixedHeader,
  sidebarLogo,
  tagsView,
  layoutMode: localLayoutMode || layoutMode,
};

export const settings = createModel()({
  state: initState,
  reducers: {
    TOGGLE_FIX_HEADER: state => {
      state.fixedHeader = !state.fixedHeader;
      return state;
    },
    TOGGLE_SIDEBAR_LOGO: state => {
      state.sidebarLogo = !state.sidebarLogo;
      return state;
    },
    TOGGLE_TAGS_VIEW: state => {
      state.tagsView = !state.tagsView;
      return state;
    },
    // 全局设置布局模式 ： 默认 vertical， 侧边菜单布局 vertical， 顶部菜单布局 horizontal， 混合菜单布局 mix
    CHANGE_LAYOUT_MODE: (state, { payload: mode }) => {
      if (['vertical', 'horizontal', 'mix'].includes(mode)) {
        state.layoutMode = mode;
      } else {
        state.layoutMode = 'vertical';
      }
      addCookie('layoutMode', state.layoutMode);
      return state;
    },
  },
  effects,
});
