import React from 'react';
import { createPortal } from 'react-dom';

interface AsidePortalProps {
  element?: Element;
  children: React.ReactNode;
}

export const AsidePortal = (props: AsidePortalProps) => {
  const attachElement = props.element
    ? props.element
    : document.querySelector('#sidebar-content');
  return attachElement ? createPortal(props.children, attachElement) : null;
};
