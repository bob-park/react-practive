import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import createSagaMiddleware from 'redux-saga';
import withRedux from 'next-redux-wrapper';

import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import AppLayout from '../components/AppLayout';

import rootSaga from '../sagas';

import reducer from '../reducers';

const NodeBird = ({ Component, store, pageProps }) => (
  <Provider store={store}>
    <Head>
      <title>Node Bird</title>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.17.0/antd.css"
      />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.17.0/antd.js" />
    </Head>
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  </Provider>
);

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  store: PropTypes.object.isRequired,
  pageProps: PropTypes.object.isRequired,
};

// 하위 컴포넌트에서 getInitialProps를 사용하기 위해서 추가
NodeBird.getInitialProps = async context => {
  console.log(context);
  const { ctx, Component } = context;
  let pageProps = {};
  if (context.Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

const configureStore = (initialState, options) => {
  // 커스터 마이징
  const sagaMiddleware = createSagaMiddleware();
  const middleWares = [sagaMiddleware];

  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middleWares))
      : compose(
          // middleWare 합성 역할
          applyMiddleware(...middleWares),

          // 배포시 제거
          !options.isServer &&
            window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : f => f, // Redux-DevTools 사용하기 위한 함수
        );
  const store = createStore(reducer, initialState, enhancer);
  // saga 실행
  sagaMiddleware.run(rootSaga);
  return store;
};

export default withRedux(configureStore)(NodeBird);
