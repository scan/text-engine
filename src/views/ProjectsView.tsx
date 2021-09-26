import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import Grid from "@mui/material/Grid";

import { selectProjects } from '~/store/reducers/projects';

const ProjectsView: FunctionComponent = () => {
  const projects = useSelector(selectProjects);

  return <Grid container>
    <pre>{ JSON.stringify(projects) }</pre>
  </Grid>;
}

export default ProjectsView;
