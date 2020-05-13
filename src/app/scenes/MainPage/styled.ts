import styled from 'styled-components';
import { Layout } from 'antd';

const { Header, Content } = Layout;

export const StyledLayout = styled(Layout)`
  min-height: 100vh !important;
  height: 100%;
`;

export const StyledHeader = styled(Header)`
  background-color: #fff !important;
  padding: 0 20px !important;
  line-height: 0 !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const StyledContent = styled(Content)`
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  min-height: 280px !important;
  display: flex;

  & .ant-spin-container {
    height: 100%;
  }

  & .ant-spin-nested-loading {
    height: 100%;
    width: 100%;
  }
`;