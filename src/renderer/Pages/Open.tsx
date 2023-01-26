import React, { FC, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { selectProject } from 'renderer/API/Project';

export const Open: FC = () => {
  const [project, setProject] = useState<string | boolean>('');
  const [projectDir, setProjectDir] = useState<string | boolean>('');

  const handleSelectProject = async () => {
    const { projectId, dirPath } = await selectProject();

    setProject(projectId);
    setProjectDir(dirPath);

    console.log(dirPath);
  };

  return (
    <>
      <Card>
        <Card.Header>Open Radicle Project directory</Card.Header>

        <Card.Body>
          <p>For manage issues of project you should open project directory.</p>

          {(project as string).length >= 10 && (
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

          {project === false && (
            <>
              <Card>
                <Card.Body>
                  <p className="text-danger">
                    Radicle project is not initialized in given directory.
                    <br />
                    Please check directory <code>{projectDir}</code> or select
                    another.
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
