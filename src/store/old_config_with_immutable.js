import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
// import rootReducer from '../reducers';
import createHelpers from './createHelpers';
import createLogger from './logger';
import {
  combineReducers
} from 'redux-immutable';
import Immutable from 'immutable';

import {
  LOCATION_CHANGE
} from 'react-router-redux';

const initialState = Immutable.fromJS({
  locationBeforeTransitions: null,
  items: [
    {
      name: "name1", value: "Value1", newObj: "Obj1",
      listAttribute: [
        {attributeId: 1, nameAttribute: "Attribute name 1", listOption: []},
        {attributeId: 2, nameAttribute: "Attribute name 2", listOption: []},
        {attributeId: 3, nameAttribute: "Attribute name 3", listOption: []}
      ]
    },
    {name: "name2", value: "Value2", newObj: "Obj2", listAttribute: []}
  ]
});
export function productReducers(state = initialState, action) {
  switch (action.type) {
    case "TEST":
      console.log("is list:" + state.set("newAppend", 1));
      return state;
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload
      });
    default:
      console.log("default console:", state);
      return state;
  }
}

export default function configureStore(initialState, helpersConfig) {
  const helpers = createHelpers(helpersConfig);
  const middleware = [thunk.withExtraArgument(helpers)];

  let enhancer;

  if (__DEV__) {
    middleware.push(createLogger());

    // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
    let devToolsExtension = f => f;
    if (process.env.BROWSER && window.devToolsExtension) {
      devToolsExtension = window.devToolsExtension();
    }

    enhancer = compose(
      applyMiddleware(...middleware),
      devToolsExtension,
    );
  } else {
    enhancer = applyMiddleware(...middleware);
  }

  const rootReducer = combineReducers({productReducers});
  const initialState1 = Immutable.Map();

  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  const store = createStore(rootReducer, initialState1, enhancer);


  if (__DEV__) {
    store.subscribe(()=> {
      // console.log("store changed", store.getState());
    });
  }

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (__DEV__ && module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default) // eslint-disable-line global-require
    );
  }

  return store;
}
