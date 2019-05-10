import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import AppLayout from "../components/AppLayout";

import withRedux from "next-redux-wrapper";

import { Provider } from "react-redux";

import { createStore, compose, applyMiddleware } from "redux";

import reducer from "../reducers";

const NodeBird = ({ Component, store }) => {
  return (
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
        <Component />
      </AppLayout>
    </Provider>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType,
  store: PropTypes.object
};

export default withRedux((initialState, options) => {
  // 커스터 마이징
  const middleWares = [];
  const enhancer = compose(
    // middleWare 합성 역할
    applyMiddleware(...middleWares),
      !options.isServer &&
      window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f // Redux-DevTools 사용하기 위한 함수
  );
  // const store = createStore(reducer, initialState, enhancer);
  // return store;
  return createStore(reducer, initialState, enhancer);
})(NodeBird);
