import { IPCResponse } from 'common/IPCResponse';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

export const MyIdentity: FC = () => {
  const [profile, setProfile] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  window.electron.ipcRenderer.on('ipc-main', (...args: unknown[]) => {
    console.log('BACK');
    console.log(args);
    if (args[0]) {
      const _method: string = args[0][0] ?? '';
      const _name: string = args[0][1] ?? '';
      // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
      const _profile: string = args[0][2] ?? '';

      if (_method === 'full-profile-res') {
        setName(_name);
        setProfile(_profile);
      }
    }
  });

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('ipc-main', ['full-profile']);
  }, []);

  return (
    <Card>
      <Card.Header>My Identity</Card.Header>

      <Card.Body>
        {profile && name && (
          <>
            <p>
              <b>Name</b>: {name} <br />
              <b>Profile</b>: {profile} <br />
            </p>
          </>
        )}
      </Card.Body>
    </Card>
  );
};
