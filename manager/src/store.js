import { init } from '@rematch/core';
import immerPlugin from '@rematch/immer';
import selectPlugin from '@rematch/select';

import { home } from './views/home/model';
import { users } from './redux/users/model';
import { settings } from './redux/settings/model';
import { permission } from './redux/permission/model';
import { tags } from './redux/tags/model';

export const models = {
  home,
  users,
  settings,
  permission,
  tags,
};

export const store = init({
  models,
  plugins: [immerPlugin(), selectPlugin()],
  redux: {
    // middlewares: [reduxLogger],
  },
});
