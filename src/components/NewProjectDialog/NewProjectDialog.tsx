import React, { FunctionComponent, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { saveProject, AppDispatch } from '~/store';
import { newProject } from '~/repository';

interface FormState {
  title: string;
  description: string;
}

const NewProjectDialog: FunctionComponent = () => {
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();

  const { control, handleSubmit } = useForm<FormState>({
    defaultValues: {
      title: "",
      description: ""
    }
  });

  const handleClose = useCallback(() => {
    history.push("/projects");
  }, [history]);

  const onSubmit = useMemo(
    () =>
      handleSubmit((values: FormState) => {
        dispatch(saveProject(newProject(values.title, values.description)));

        history.push('/projects');
      }),
    [history, dispatch, handleSubmit]
  );

  return (
    <Dialog open onClose={handleClose} fullWidth>
      <form onSubmit={onSubmit}>
        <DialogTitle>New Project</DialogTitle>
        <DialogContent>
          <Controller
            control={control}
            name="title"
            rules={{ required: true, maxLength: 80 }}
            render={({ field: { ref, ...fieldProps }, fieldState: { error } }) => (
              <TextField
                inputRef={ref}
                {...fieldProps}
                fullWidth
                label="Project Title"
                sx={{ marginTop: 2 }}
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field: { ref, ...fieldProps }, fieldState: { error } }) => (
              <TextField
                inputRef={ref}
                {...fieldProps}
                fullWidth
                multiline
                minRows={3}
                label="Short Description"
                sx={{ marginTop: 2 }}
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose} type="button">
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default NewProjectDialog;
