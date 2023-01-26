import React, { FC } from 'react';
import { Card } from 'react-bootstrap';

/**
 * @todo add reactions to props and other things after deal with radicle api.
 */
type IssueCommentProps = {
  author: string;
  text: string;
};

export const IssueComment: FC<IssueCommentProps> = ({ author, text }) => {
  return (
    <Card>
      <Card.Header>
        <b>{author}</b> wrote:
      </Card.Header>
      <Card.Body>
        <p>{text}</p>
      </Card.Body>
    </Card>
  );
};
