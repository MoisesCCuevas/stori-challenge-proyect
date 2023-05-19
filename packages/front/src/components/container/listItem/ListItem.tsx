import React from "react";
import '../../../theme/components/core/listItem.scss'

interface ListItem {
  children?: React.ReactNode
  onClick?: () => void
};

const ListItem : React.FC<ListItem> = (props) => {
  const {
    children,
    onClick
  } = props;

  return (
    <div
      className="listItem"
      data-testid="listItem"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ListItem;
