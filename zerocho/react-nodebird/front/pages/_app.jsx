import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import axios from 'axios';

import createSagaMiddleware from 'redux-saga';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';

import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import AppLayout from '../components/AppLayout';

import rootSaga from '../sagas';

import reducer from '../reducers';
import { LOAD_USER_REQUEST } from '../reducers/user';

const NodeBird = ({ Component, store, pageProps }) => (
  <Provider store={store}>
    <Head>
      <title>Node Bird</title>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.17.0/antd.css"
      />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.17.0/antd.js" />
      <link
        rel="stylesheet"
        type="text/css"
        charset="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
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
  const { ctx, Component } = context;

  const state = ctx.store.getState();

  const cookie = ctx.isServer ? ctx.req.headers.cookie : "";

  if (ctx.isServer && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  if (!state.user.me) {
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST,
    });
  }

  let pageProps = {};
  if (context.Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

const configureStore = (initialState, options) => {
  // 커스터 마이징
  const sagaMiddleware = createSagaMiddleware();
  const middleWares = [sagaMiddleware, (store) => (next) => (action) => {
    console.log(action);
    next(action);
  }];

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
  store.sagaTask = sagaMiddleware.run(rootSaga);
  // saga 실행

  return store;
};

export default withRedux(configureStore)(withReduxSaga(NodeBird));
