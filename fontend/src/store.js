import { init } from '@rematch/core';
import immerPlugin from '@rematch/immer';
import selectPlugin from '@rematch/select';

import { home } from './pages/home/model';

export const models = {
  home,
};

export const store = init({
  models,
  plugins: [immerPlugin(), selectPlugin()],
  redux: {
    // middlewares: [reduxLogger],
  },
});
