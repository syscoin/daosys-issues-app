import React, { FC } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

type IssueCardProps = {
  title: string;
  onClick: () => void;
};

export const IssuesCard: FC<IssueCardProps> = ({ title, onClick }) => {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={8}>{title}</Col>
          <Col xs={4}>
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                onClick();
              }}
            >
              View
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
