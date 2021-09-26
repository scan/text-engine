import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState, Project, ProjectID } from "~/store";

export interface ProjectsState {
  projects: Record<ProjectID, Project>
}

const initialState: ProjectsState = {
  projects: {}
}

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    saveProject: (state, action: PayloadAction<Project>) => {
      const project = action.payload;
      state.projects[project.id] = project;
    },
    removeProject: (state, action: PayloadAction<ProjectID>) => {
      delete state.projects[action.payload];
    }
  }
});

export const selectProjects = (state: RootState): Array<Project> => Object.values(state.projects.projects);
export const selectProject = (id: ProjectID) => (state: RootState): Project | undefined => state.projects.projects[id];

export default projectsSlice.reducer;
