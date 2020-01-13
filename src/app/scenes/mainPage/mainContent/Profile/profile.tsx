import * as React from 'react';
import { connect } from 'react-redux';
import { IProps } from './types';
import { Container, Title } from './styled';

const Profile: React.FC<IProps> = (props) => {
  console.log(props);
  return (
    <Container>
      <Title>Profile</Title>
    </Container>
  );
};

export const ProfileConnected = connect(
  null,
  null
)(Profile);
