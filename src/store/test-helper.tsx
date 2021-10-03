import React, { FunctionComponent, ReactElement } from 'react';

import {
  render as rtlRender,
  RenderOptions as RtlRenderOptions,
} from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import type { RootState } from './index';
import projectsReducer from './reducers/projects';

type PreloadedState = Partial<RootState>;
type RenderOptions = RtlRenderOptions & {
  preloadedState?: PreloadedState;
  store?: ReturnType<typeof configureStore>;
};

export const render = (
  ui: ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: { projects: projectsReducer },
      preloadedState,
    }),
    ...renderOptions
  }: RenderOptions = {}
) => {
  const Wrapper: FunctionComponent = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};
