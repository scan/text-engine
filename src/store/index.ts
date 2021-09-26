import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import projectsReducer from './reducers/projects';

export type { Project, Node, ProjectID, NodeID, Option } from "~/repository";

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
