import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface AsidePortalProps {
  element?: Element;
  children: React.ReactNode;
}
interface StyledAsidePortalProps {
  fixed?: boolean;
}

const StyledAsidePortal = styled('div')((props: StyledAsidePortalProps) => ({
  width: '270px',
  position: props.fixed === true ? 'fixed' : 'relative',
  transition: 'position 0.5s ease',
  top: props.fixed === true ? '60px' : '0',
}));

export const AsidePortal = (props: AsidePortalProps) => {
  const [fixed, setFixed] = useState(false);

  const setFixedSidebar = () => {
    if (window.scrollY >= 140) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  };
  window.addEventListener('scroll', setFixedSidebar);
  /*   useEffect(() => {
    console.log(fixed);
  }, [fixed]); */

  const [element, setElement] = useState<Element | null>(null);

  useEffect(() => {
    const attachElement = props.element
      ? props.element
      : document.querySelector('#sidebar-content');
    setElement(attachElement);
  }, [props.element]);

  return element ? (
    createPortal(
      <StyledAsidePortal
        fixed={fixed}
        className='aaaa'
      >
        {props.children}
      </StyledAsidePortal>,
      element,
    )
  ) : (
    <p>Error portal</p>
  );
};
