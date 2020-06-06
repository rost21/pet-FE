import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
`;

export const Title = styled.h2`
  font-size: 30px;
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow-y: auto;
  width: 100%;
  height: calc(100% - 64px);
  margin: 10px 0;
`;

export const InformationRow = styled.div`
  display: flex;
  font-weight: bold;
`;

export const InformationRowKey = styled.div`
  min-width: 100px;
`;