import React from 'react';
import { createPortal } from 'react-dom';

interface AsidePortalProps {
  children: React.ReactNode;
}

export const AsidePortal = (props: AsidePortalProps) => {
  const attachElement = document.querySelector('#sidebar-content');
  return attachElement ? createPortal(props.children, attachElement) : null;
};
