import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, Route, Switch } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import Icon from '@mui/material/Icon';

import { selectProjects } from '~/store/reducers/projects';
import NewProjectDialog from '~/components/NewProjectDialog';

const ProjectsView: FunctionComponent = () => {
  const projects = useSelector(selectProjects);

  return (
    <>
      <Grid container>
        <pre>{JSON.stringify(projects)}</pre>
      </Grid>
      <Switch>
        <Route path="/projects/new">
          <NewProjectDialog />
        </Route>
      </Switch>
      <Fab
        sx={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          margin: { xs: 2, md: 3 },
        }}
        aria-label="Add Project"
        color="primary"
        to="/projects/new"
        component={RouterLink}
      >
        <Icon>add</Icon>
      </Fab>
    </>
  );
}

export default ProjectsView;
