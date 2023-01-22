import React, { FC } from 'react';
import { Button, Card } from 'react-bootstrap';
import { selectProject } from 'renderer/API/Project';

export const Open: FC = () => {
  const handleSelectProject = async () => {
    const project_id: string = await selectProject();

    console.log(project_id);
  };

  return (
    <>
      <Card>
        <Card.Header>Open Radicle Project directory</Card.Header>

        <Card.Body>
          <p>For manage issues of project you should open project directory.</p>

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
