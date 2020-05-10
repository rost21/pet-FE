import styled from 'styled-components';
import { Card, Tag } from 'antd';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  font-size: 30px;
  margin: 0;
`;

export const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow-y: auto;
  width: 100%;
  height: calc(100% - 64px);
  margin: 10px 0;
`;

export const ProjectCardStyled = styled(Card)`
  width: 300px;
  min-height: 160px;
  max-height: 200px;
  margin: 10px 10px 0 0 !important;
`;

export const ProjectsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
`;

export const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const NotFoundMessage = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const ProjectBody = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
`;

export const TagStyled = styled(Tag)`
  margin-left: 30px !important;
  font-size: 16px !important;
  padding: 5px 10px !important;
`;

export const ProjectDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const DescriptionBody = styled.span`
  max-height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  padding-top: 5px;
  &:hover {
    cursor: pointer;
  }
`;

export const UserAvatar = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: lightgray;
  font-size: 25px;
`;