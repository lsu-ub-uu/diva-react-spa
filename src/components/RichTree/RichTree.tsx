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

import * as React from 'react';
import {
  TreeView,
  TreeItem,
  useTreeItem,
  TreeItemContentProps,
  TreeItemProps,
} from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Typography } from '@mui/material';
import clsx from 'clsx';

export interface RenderTree {
  id: string;
  name: string;
  children?: RenderTree[];
  disabled?: boolean;
}

interface RichTreeProps {
  tree: RenderTree;
  onSelected?: (id: string) => void;
}

const CustomContent = React.forwardRef(function CustomContent(
  props: TreeItemContentProps,
  ref,
) {
  const {
    classes,
    className,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    preventSelection(event);
  };

  const handleExpansionClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    handleExpansion(event);
  };

  const handleSelectionClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    handleSelection(event);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onMouseDown={handleMouseDown}
      ref={ref as React.Ref<HTMLDivElement>}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        onClick={handleExpansionClick}
        className={classes.iconContainer}
      >
        {icon}
      </div>
      <Typography
        onClick={handleSelectionClick}
        component='div'
        className={classes.label}
      >
        {label}
      </Typography>
    </div>
  );
});

function CustomTreeItem(props: TreeItemProps) {
  return (
    <TreeItem
      ContentComponent={CustomContent}
      {...props}
    />
  );
}

export const RichTree = (props: RichTreeProps) => {
  const handleSelect = (event: React.SyntheticEvent, nodeId: string) => {
    if (props.onSelected) props.onSelected(nodeId);
  };

  const labelMaker = (nodes: RenderTree): string => {
    if (nodes.id !== 'root') return `${nodes.name} (kod ${nodes.id})`;
    return nodes.name;
  };

  const renderTree = (nodes: RenderTree) => (
    <CustomTreeItem
      key={`node-${nodes.id}-${nodes.name}`}
      nodeId={nodes.id}
      label={labelMaker(nodes)}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </CustomTreeItem>
  );

  return (
    <TreeView
      aria-label='subject tree view'
      onNodeSelect={handleSelect}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{
        minHeight: 100,
        flexGrow: 1,
        maxWidth: '100%',
      }}
    >
      {renderTree(props.tree)}
    </TreeView>
  );
};
