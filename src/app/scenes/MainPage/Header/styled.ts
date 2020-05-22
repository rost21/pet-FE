import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PopoverRow = styled.div<{ disabled?: boolean }>`
  cursor: pointer;
  background-color: ${props => props.disabled && 'transparent'};
  fill: ${props => props.disabled && 'transparent'};
  color: ${props => props.disabled && 'rgb(165, 173, 186)'};
  &:hover {
    color: ${props => props.disabled ? 'rgb(165, 173, 186)' : '#001529'};
    font-weight: ${props => !props.disabled && 500};
    cursor: ${props => props.disabled && 'not-allowed'};
  }
`;
