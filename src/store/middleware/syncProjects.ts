import type { Middleware } from 'redux'

import type { ProjectsState } from '~/store/reducers/projects';
import Repository from '~/repository';

interface PartialState {
  projects: ProjectsState;
}

const syncProjects: Middleware<{}, PartialState> = (store) => (next) => (action) => {
  const { projects: { projects } } = store.getState();

  Promise.all(Object.values(projects).map((project) => Repository.saveProject(project)));

  return next(action);
}

export default syncProjects;
