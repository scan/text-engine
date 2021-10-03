import * as React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render } from '~/store/test-helper';

import NewProjectDialog from './NewProjectDialog';

describe('NewProjectDialog', () => {
  test('renders the form', () => {
    render(<NewProjectDialog />);

    expect(screen.getByLabelText(/project title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/short description/i)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument();
  });
});
