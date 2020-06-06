import * as React from 'react';
import { IProject } from 'app/types';
import { ProjectCardStyled } from './styled';
import { cutString } from 'app/utils/project';

interface IProps {
  project: IProject;
  redirectTo: (id: string) => void;
}

export const ProjectCard: React.FC<IProps> = ({ project, redirectTo }) => {
  return (
    <ProjectCardStyled bordered title={project.title} hoverable onClick={() => redirectTo(`/main/projects/${project.id}`)}>
      <div>{cutString(project.description || '', 35)} </div>
      Owner: {project.owner.username} <br/>
      {project.members && 'Members: ' +  project.members.map(member => ` ${member.username}`)}
    </ProjectCardStyled>
  );
};
