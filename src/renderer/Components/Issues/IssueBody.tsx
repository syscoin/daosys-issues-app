import React, { FC } from 'react';
import { Card } from 'react-bootstrap';

type IssueBodyProps = {
  title: string;
  description: string;
  assigned: string[];
  state: string;
  tags: string[];
};

export const IssueBody: FC<IssueBodyProps> = ({
  title,
  description,
  assigned,
  state,
  tags,
}) => {
  return (
    <Card>
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <p>{description}</p>
        <hr />
        <span className="text-muted">{tags && tags.join(', ')}</span> <br />
        <span>{state}</span>
        <span className="text-primary">{assigned && assigned.join(', ')}</span>
      </Card.Body>
    </Card>
  );
};
