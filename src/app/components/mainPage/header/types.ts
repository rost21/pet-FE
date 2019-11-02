interface IOwnProps {
  collapsed: boolean;
  onCollapse: () => void;
  replace: (path: string) => void;
}

export interface IProps extends IOwnProps {}
