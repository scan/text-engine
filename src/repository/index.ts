export type ProjectID = string;

export interface Project {
  id: ProjectID;
  name: string;
  description: string;
  nodes: Record<NodeID, Node>;
  createdAt: number;
  start?: NodeID;
}

export type NodeID = string;

export interface Node {
  id: NodeID;
  title: string;
  body: string;
  options: Array<Option>;
}

export interface Option {
  text: string;
  target: NodeID;
}

const KEY_PROJECTS = 'projects';
const KEY_PROJECT = 'project';

const getProjectFromString = (str: string): Project => {
  const parsed = JSON.parse(str);

  return parsed;
};

const repository = {
  getProjects: async (): Promise<Array<Project>> => {
    const projectIDString = window.localStorage.getItem(KEY_PROJECTS);

    if (!projectIDString) {
      return [];
    }

    const projectIDs = JSON.parse(projectIDString);
    if (!Array.isArray(projectIDs)) {
      return [];
    }

    const projects: Array<Project> = [];
    for (let i = 0; i < projectIDs.length; i++) {
      if (typeof projectIDs[i] === 'string') {
        const projectString = window.localStorage.getItem(
          `${KEY_PROJECT}.${projectIDs}`
        );
        if (typeof projectString === 'string') {
          projects.push(getProjectFromString(projectString));
        }
      }
    }

    return projects;
  },
  getProject: (id: ProjectID): Project | undefined => {
    const projectString = window.localStorage.getItem(`${KEY_PROJECT}.${id}`);
    if (typeof projectString === 'string') {
      return getProjectFromString(projectString);
    }
    return undefined;
  },
  saveProject: async (project: Project) => {
    const id = project.id;

    window.localStorage.setItem(
      `${KEY_PROJECT}.${id}`,
      JSON.stringify(project)
    );
    const projectsString = window.localStorage.getItem(KEY_PROJECTS);
    if (!projectsString) {
      window.localStorage.setItem(KEY_PROJECTS, JSON.stringify([id]));
    } else {
      const projects: Array<ProjectID> = JSON.parse(projectsString);
      if (!Array.isArray(project)) {
        window.localStorage.setItem(KEY_PROJECTS, JSON.stringify([id]));
      } else {
        if (!projects.includes(id)) {
          projects.push(id);
          window.localStorage.setItem(KEY_PROJECTS, JSON.stringify(projects));
        }
      }
    }
  },
} as const;

export default repository;
