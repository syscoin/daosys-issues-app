import React, { FC } from 'react';
import { Alert } from 'react-bootstrap';

export const NotInstalledAlert: FC = () => {
  return (
    <Alert className="mt-3 mb-3" variant="warning">
      <p>
        Radicle CLI is not installed in your machine. <br />
        Please install it and do not forget to install <code>rad</code> command
        into PATH.
      </p>
    </Alert>
  );
};
