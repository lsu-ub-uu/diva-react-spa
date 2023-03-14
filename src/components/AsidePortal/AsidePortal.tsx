import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface AsidePortalProps {
  element?: Element;
  children: React.ReactNode;
}

export const AsidePortal = (props: AsidePortalProps) => {
  const [element, setElement] = useState<Element | null>(null);

  useEffect(() => {
    const attachElement = props.element
      ? props.element
      : document.querySelector('#sidebar-content');

    setElement(attachElement);
  }, [props.element]);

  return element ? createPortal(props.children, element) : <p>Error portal</p>;
};
