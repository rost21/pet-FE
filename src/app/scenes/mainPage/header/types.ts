interface IOwnProps {
  collapsed: boolean;
  onCollapse: () => void;
  replace: (path: string) => void;
}

interface IDispatchProps {
  logout?: () => void;
}

export interface IProps extends IOwnProps, IDispatchProps {}
