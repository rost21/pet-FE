import styled from 'styled-components';
import { List } from 'antd';

const { Item: _Item } = List;

export const UserSelect = styled.div`
  height: 500px;
  overflow-y: auto;
  margin-top: 8px;
`;

export const SelectableRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px 0 0;
  align-items: center;
`;

export const Item = styled(_Item)`
  padding: 10px 0 !important;
  cursor: pointer;
`;