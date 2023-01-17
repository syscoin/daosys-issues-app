import React, { FC } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const LeftBar: FC<{}> = () => {
  return (
    <>
      <Card>
        <Card.Header>Navigation</Card.Header>
        <Card.Body>
          <div className="list-group">
            <Link to="/open" className="list-group-item">
              Open project
            </Link>
            <Link to="/me" className="list-group-item">
              My identity
            </Link>
            <Link to="/me" className="list-group-item">
              App settings
            </Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
