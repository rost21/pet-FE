import * as React from 'react';
import { IProject } from 'app/types';
import { ProjectStyled } from './styled';
// import ROUTES from '../../../../routes';

interface IProps {
  project: IProject;
  redirectTo: (id: string) => void;
}

export const ProjectComponent: React.FC<IProps> = ({ project, redirectTo }) => {
  return (
    <ProjectStyled bordered title={project.title} hoverable onClick={() => redirectTo(`/main/projects/${project.id}`)}>
      <div>{project.shortDescription || 'description'} </div>
      Owner: {project.owner.username} <br/>
      Members: {project.members && project.members.map((member) => <span key={member.id}>{member.username} </span>)}
    </ProjectStyled>
  );
};
