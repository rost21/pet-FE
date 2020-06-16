import * as React from 'react';
import { IProject } from 'app/types';
import { ProjectCardStyled } from './styled';
import { cutString } from 'app/utils/project';
import { Avatar } from 'antd';

interface IProps {
  project: IProject;
  redirectTo: (id: string) => void;
}

export const ProjectCard: React.FC<IProps> = ({ project, redirectTo }) => {
  const renderMembers = () => {
    let members = [];
    if (project.members.length > 5) {
      members = project.members.slice(0, 5);  
    } else {
      members = project.members;
      
    }
    return members.map(member => 
      <Avatar key={member.id} style={{ marginRight: 4 }}>
        {<span title={member.firstname + ' ' + member.lastname}>{member.firstname[0].toUpperCase() + '' + member.lastname[0].toUpperCase()}</span>}
      </Avatar>);
  };

  return (
    <ProjectCardStyled bordered title={project.title} hoverable onClick={() => redirectTo(`/main/projects/${project.id}`)}>
      <div>{cutString(project.description || '', 35)} </div>
      Owner: {<b>{project.owner.firstname + ' ' + project.owner.lastname}</b>} <br/>
      {[project.members && 'Members: ',
      project.members && renderMembers(),
      project.members.length > 5 && '...']}
    </ProjectCardStyled>
  );
};
