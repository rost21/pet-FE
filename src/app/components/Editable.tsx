import * as React from 'react';
import { EditableWrapper } from './styled';

interface IProps {
  text: any;
  type: 'input' | 'textarea' | 'select';
  placeholder?: string;
  children: React.ReactNode;
  canEdit?: boolean;
  onEndEditing?: () => void;
  childRef: React.MutableRefObject<any>;
}

export const Editable: React.FC<IProps> = ({
  text,
  type,
  placeholder,
  children,
  onEndEditing,
  canEdit = true,
  childRef,
  ...props
}) => {

  const [isEditing, setEditing] = React.useState(false);

  React.useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);

  const handleKeyDown = (event: any, type: IProps['type']) => {
    const { key } = event;
    const keys = ['Escape', 'Tab'];
    const enterKey = 'Enter';
    const allKeys = [...keys, enterKey];
    if (
      (type === 'textarea' && keys.indexOf(key) > -1) ||
      (type !== 'textarea' && allKeys.indexOf(key) > -1)
    ) {
      setEditing(false);
      onEndEditing!();
    }
  };

  return (
    <EditableWrapper isEditing={isEditing} canEdit={canEdit} {...props}>
      {isEditing && canEdit ? (
        <div
          onBlur={() => {
            setEditing(false);
            type !== 'select' && onEndEditing!();
          }}
          onKeyDown={e => handleKeyDown(e, type)}
        >
          {children}
        </div>
      ) : (
        <span onClick={() => setEditing(true)}>
            {text || placeholder || 'Editable content'}
        </span>
      )}
    </EditableWrapper>
  );
};