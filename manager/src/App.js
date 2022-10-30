import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { HashRouter } from 'react-router-dom';
import { store } from './store';
import Router from './router';

const App = () => {
  return (
    <ConfigProvider>
      <Provider store={store}>
        <HashRouter>
          <Router />
        </HashRouter>
      </Provider>
    </ConfigProvider>
  );
};

export default App;
