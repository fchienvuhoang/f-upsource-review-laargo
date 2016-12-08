import React from 'react';
import App from '../components/App';
// Child routes
import home from './home';
import products from './products';
import categories from './categories';
import categoryDetail from './categories/categoryDetail';
import productDetail from './products/productDetail';
import testDrag from './testDrag';
import storeSetting from './storeSettings';
import changePassword from './storeSettings/Sections/changePassword';
import content from './content';
import error from './error';

export default {

  path: '/',

  children: [
    home,
    products,
    categories,
    categoryDetail,
    productDetail,
    testDrag,
    storeSetting,
    changePassword,

    // place new routes before...
    content,
    error
  ],

  async action({next, render, context}) {
    const component = await next();
    if (component === undefined) return component;
    return render(
      <App context={context}>{component}</App>
    );
  }
};
