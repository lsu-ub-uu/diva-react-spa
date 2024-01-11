/*
 * Copyright 2023 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 */

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
  // overflow: 'scroll',
  height: '100%',
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

  const [element, setElement] = useState<Element | null>(null);

  useEffect(() => {
    const attachElement = props.element
      ? props.element
      : document.querySelector('#sidebar-content');
    setElement(attachElement);
  }, [props.element]);

  return element
    ? createPortal(
        <StyledAsidePortal fixed={fixed}>{props.children}</StyledAsidePortal>,
        element,
      )
    : null;
};
