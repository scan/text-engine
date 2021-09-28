import React, { FunctionComponent, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { margin } from '@mui/system';

interface FormState {
  title: string | null;
  description: string | null;
}

const NewProjectDialog: FunctionComponent = () => {
  const history = useHistory();
  const { control, handleSubmit } = useForm<FormState>({
    defaultValues: {
      title: null,
      description: null
    }
  });

  const handleClose = useCallback(() => {
    history.push("/projects");
  }, [history]);

  const submitForm: SubmitHandler<FormState> = useCallback((values: FormState) => {
    console.log(values);

    history.push("/projects");
  }, [history]);

  return (
    <Dialog open onClose={handleClose} fullWidth>
      <form onSubmit={handleSubmit(submitForm)}>
        <DialogTitle>New Project</DialogTitle>
        <DialogContent>
          <Controller
            control={control}
            name="title"
            defaultValue={null}
            render={({ field: { ref, ...fieldProps } }) => (
              <TextField
                inputRef={ref}
                {...fieldProps}
                fullWidth
                label="Project Title"
                sx={{ marginTop: 2 }}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            defaultValue={null}
            render={({ field: { ref, ...fieldProps } }) => (
              <TextField
                inputRef={ref}
                {...fieldProps}
                fullWidth
                multiline
                minRows={3}
                label="Short Description"
                sx={{ marginTop: 2 }}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose} role="button">
            Cancel
          </Button>
          <Button color="primary" onClick={handleClose} role="submit">
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default NewProjectDialog;
