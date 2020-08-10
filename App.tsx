import React from 'react';
import 'react-native-gesture-handler';
import Router from './src/routers/Router';
import { Provider } from 'react-redux';
import { store } from './store';

export default function App() {

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}


