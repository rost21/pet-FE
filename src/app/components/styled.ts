import styled from 'styled-components';

export const EditableWrapper = styled.div<{ isEditing: boolean, canEdit: boolean }>`
  &:hover {
    background: ${props => !props.isEditing && props.canEdit && 'rgb(235, 236, 240);'};
    transition: background-color 0.3s, border-color 0.3s ease-in-out 0s;
    border-radius: 3px;
    border-width: 2px;
  }
`;