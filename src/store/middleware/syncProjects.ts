import type { Middleware } from 'redux'

import type { RootState, AppDispatch } from '~/store';
import Repository from '~/repository';

const syncProjects: Middleware<{}, RootState, AppDispatch> = (store) => (next) => (action) => {
  const { projects: { projects } } = store.getState();

  Promise.all(Object.values(projects).map((project) => Repository.saveProject(project)));

  return next(action);
}

export default syncProjects;
