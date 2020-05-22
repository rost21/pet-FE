import styled from 'styled-components';
// @ts-ignore
import _Board from 'react-trello';
import { Modal as _Modal } from 'antd';

export const KanbanBoard = styled(_Board)`
  background-color: inherit;
  max-height: calc(100% - 64px);
  overflow-y: auto;
  padding: 8px 0px 0px 0px;
  & > div {
    width: 100%
  }

  & section > div {
    width: 100%;
    min-width: 0;
  }
`;

export const Modal = styled(_Modal)`
  top: 20px !important;
`;