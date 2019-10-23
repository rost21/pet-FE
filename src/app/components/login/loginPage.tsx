import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/login';
import * as styled from './loginPage.styled';

export const LoginPage = (props: any) => {
  const onClick = () => props.login('sdsd');
  return (
    <styled.Container>
      Login page <button onClick={onClick}>CLICK</button>
    </styled.Container>
  );
};

export const LoginPageConnected = connect(
  // (state) => {
  //   const comeFrom =
  //     get(
  //       state.modals.openedModalWindows.find(
  //         m => m.type === ModalTypes.MOBILE_FULL_SCREEN_VIEW_ACTIONS
  //       ),
  //       'extra.comeFrom'
  //     ) || ''
  //   return {
  //     isAuthenticated: state.auth.isLoggedIn,
  //     publicImage: isReportEnabled(state) ? state.search.selectedImageId : '',
  //     comeFrom
  //   }
  // },
  null,
  (dispatch) => ({
    login: (value: string) => dispatch(actions.setText(value))
  })
)(LoginPage);
