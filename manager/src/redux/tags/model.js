import { createModel } from '@rematch/core';
import { effects } from './effects';

const initState = {
  tags: [],
  defaultTags: [],
};

export const tags = createModel()({
  state: initState,
  reducers: {
    setDefaultTags: (state, tag) => {
      state.defaultTags = [...tag];
      return state;
    },
    addTags: (state, { payload: tag }) => {
      state.tags = [...state.tags, tag];
      return state;
    },
    deleteTags: (state, { payload: tag }) => {
      state.tags = [...state.tags.filter(v => v.path !== tag.path)];
      // return {
      //   ...state,
      //   tags : [...state.tags.filter( v => v.path !== tag.path )]
      // }
      return state;
    },
    clearAllTags: state => {
      state.tags = [...state.tags.filter(v => v.unRemove)];
      return state;
    },
    CLOSE_OTHERS_TAGS: (state, { payload: tag }) => {
      state.tags = [
        ...state.tags.filter(v => v.unRemove || v.path === tag.path),
      ];
      return state;
    },
    UPDATE_TAGS: (state, { payload: tag }) => {
      if (Array.isArray(tag) && tag.length > 0) {
        tag.forEach(item => {
          const index = state.tags.findIndex(v => v.path === item.path);

          if (index > -1) {
            state.tags.splice(index, 1, {
              ...state.tags[index],
              ...item,
            });
          } else {
            state.tags = [...state.tags, item];
          }
        });
      }
      return state;
    },
  },
  effects,
});
