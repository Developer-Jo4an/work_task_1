import React, {useEffect} from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import MainLayout from '../components/layouts/MainLayout';
import PropTypes from "prop-types";
import '../styles/main.scss';

const MyApp = ({Component, pageProps}) => {

  /**
   * Для просмотра консоли на мобильных устройствах
   * Пример: http://localhost:3000/?eruda=true
   */
  useEffect(() => {
    if (!/eruda=true/.test(window.location)) return;
    const script = document.createElement("script");
    script.src = '//cdn.jsdelivr.net/npm/eruda';
    script.async = true;
    script.onload = () => eruda.init();
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const appHeight = () => {
      const h = window.innerHeight;
      const w = window.innerWidth;
      document.getElementById('html-point').style.setProperty('--app-height', `${h}px`);
      document.getElementById('html-point').style.setProperty('--app-width', `${w}px`);
    };
    window.addEventListener('resize', appHeight);
    appHeight()
  }, []);


  return (
    <Provider store={store}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object
};

export default MyApp;
