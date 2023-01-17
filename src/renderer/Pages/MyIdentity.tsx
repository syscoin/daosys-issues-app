import React, { FC, useCallback, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

export const MyIdentity: FC = () => {
  const [profile, setProfile] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  useCallback(() => {
    window.electron.ipcRenderer.on('ipc-main', (args: unknown) => {
      if (args && (args as string[])) {
        if (args[0] === 'full-profile-res') {
          setName(args[1] ?? null);
          setProfile(args[2] ?? null);
        }
      }
    });
  }, []);

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
