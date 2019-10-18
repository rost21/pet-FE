import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions/login';

export const LoginPage = (props: any) => (
  <div>
    Login page <button onClick={props.login}>CLICK</button>
  </div>
);

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
    login: () => dispatch(actions.setText())
  })
)(LoginPage);
