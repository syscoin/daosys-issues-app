import React, { FC, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { selectProject } from 'renderer/API/Project';

export const Open: FC = () => {
  const [project, setProject] = useState<string>('');

  const handleSelectProject = async () => {
    const projectId: string | boolean = await selectProject();

    setProject(projectId);
  };

  return (
    <>
      <Card>
        <Card.Header>Open Radicle Project directory</Card.Header>

        <Card.Body>
          <p>For manage issues of project you should open project directory.</p>

          {project !== '' && (
            <>
              <Card>
                <Card.Body>
                  <p>
                    Project found in given directory. Project Id - {project}
                  </p>
                </Card.Body>
              </Card>
            </>
          )}

          <Button
            onClick={() => handleSelectProject()}
            className="mt-3"
            variant="primary"
            size="lg"
          >
            Select project
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};
