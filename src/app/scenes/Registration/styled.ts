import styled from 'styled-components';
import Form from 'antd/lib/form';

export const LoginFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .login-form-forgot {
    float: right;
  }
  .login-form-button {
    width: 100%;
  }
`;

export const LoginFormTitle = styled.div`
  text-align: center;
  font-weight: 600;
  font-size: 25px;
`;

export const LoginForm = styled(Form)`
  max-width: 300px;
`;
