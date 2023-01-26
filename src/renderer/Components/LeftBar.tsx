import React, { FC, useContext } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MainContext } from 'renderer/Contexts/MainContext';

export const LeftBar: FC<{}> = () => {
  const { isAuthorized } = useContext(MainContext);

  const classNameTmp = `list-group-item${!isAuthorized ? ' disabled' : ''}`;

  return (
    <>
      <Card>
        <Card.Header>Navigation</Card.Header>
        <Card.Body>
          <div className="list-group">
            <Link to="/open" className={classNameTmp}>
              Open project
            </Link>
            <Link to="/issues" className={classNameTmp}>
              Issues
            </Link>
            <Link to="/me" className={classNameTmp}>
              My identity
            </Link>
            <Link to="/settings" className="list-group-item">
              App settings
            </Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
