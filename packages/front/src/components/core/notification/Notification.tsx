import React, { useState, useEffect } from "react";
import '../../../theme/components/core/notification.scss'

interface Notification {
  message?: string
  type: string
  clearFunction?: () => void
};

const Notification : React.FC<Notification> = (props) => {
  const {
    message,
    type,
    clearFunction
  } = props;

  const [active, setActive] = useState<boolean>(false);
  let timeout : any = null;

  useEffect(() => {
    if (message) {
      setActive(true);
      timeout = setTimeout(() => {
        setActive(false);
        clearFunction && clearFunction();
      }, 2000);
    }
    return () => {
      clearTimeout(timeout);
    }
  }, [message]);

  return (
    <div
      className={`notification ${active && 'notification-active'} ${type}`}
    >
      <label>{message}</label>
    </div>
  );
};

export default Notification;

