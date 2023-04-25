import React, {useEffect, useState} from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }:any) => {
  const [domReady, setDomReady] = useState(false)

  useEffect(() => {
    setDomReady(true)
  }, [])

  const root = document.getElementById('root') as HTMLElement;
  return domReady ? createPortal(children, root) : null;
} 

export default Portal;
