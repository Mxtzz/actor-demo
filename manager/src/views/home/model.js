import { createModel } from '@rematch/core';
import { effects } from './effects';

const initState = {};

export const home = createModel()({
  state: initState,
  reducers: {},
  effects,
});
