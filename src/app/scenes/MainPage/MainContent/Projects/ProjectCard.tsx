import * as React from 'react';
import { IProject } from 'app/types';
import { ProjectCardStyled } from './styled';
import { cutString } from 'app/utils/projects';
// import ROUTES from '../../../../routes';

interface IProps {
  project: IProject;
  redirectTo: (id: string) => void;
}

export const ProjectCard: React.FC<IProps> = ({ project, redirectTo }) => {
  return (
    <ProjectCardStyled bordered title={project.title} hoverable onClick={() => redirectTo(`/main/projects/${project.id}`)}>
      <div>{cutString(project.description || '', 35)} </div>
      Owner: {project.owner.username} <br/>
      {project.members &&
      // && project.members.length > 2 ? 'Members: ' + 
      //   project.members.slice(0, 2).map(member => {
      //     return (
      //       ` ${member.username}`
      //     );
      //   })
      //   :
        'Members: ' +  project.members.map(member => ` ${member.username}`)}
    </ProjectCardStyled>
  );
};
