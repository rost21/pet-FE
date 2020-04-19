import * as React from 'react';

interface IProps {
  text: any;
  type: 'input' | 'textarea';
  placeholder: string;
  children: React.ReactNode;
  canEdit: boolean;
  onEndEditing?: () => void;
  childRef: any;
}

export const Editable: React.FC<IProps> = ({
  text,
  type,
  placeholder,
  children,
  onEndEditing,
  canEdit,
  childRef,
  ...props
}) => {
  const [isEditing, setEditing] = React.useState(false);

  React.useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);

  const handleKeyDown = (event: any, type: any) => {
    const { key } = event;
    const keys = ["Escape", "Tab"];
    const enterKey = "Enter";
    const allKeys = [...keys, enterKey];
    if (
      (type === "textarea" && keys.indexOf(key) > -1) ||
      (type !== "textarea" && allKeys.indexOf(key) > -1)
    ) {
      setEditing(false);
      onEndEditing!();
    }
  };

  return (
    <div {...props}>
      {isEditing && canEdit ? (
        <div
          onBlur={() => {setEditing(false), onEndEditing!()}}
          onKeyDown={e => handleKeyDown(e, type)}
        >
          {children}
        </div>
      ) : (
        <span onClick={() => setEditing(true)}>
            {text || placeholder || "Editable content"}
        </span>
      )}
    </div>
  );
};