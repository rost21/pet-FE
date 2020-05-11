import * as React from 'react';
import { IProps } from './types';
import { Container, Title } from './styled';

export const Profile: React.FC<IProps> = props => {
  // console.log(props);
  return (
    <Container>
      <Title>Profile</Title>
    </Container>
  );
};
