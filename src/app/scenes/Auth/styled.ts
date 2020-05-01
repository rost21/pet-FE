import styled from 'styled-components';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';

export const LoginFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

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

export const FormItem = styled(Form.Item)`
  & > .ant-col {
    width: 100%;
  }
`;