import * as React from 'react';
import { TreeView, TreeItem } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export interface RenderTree {
  id: string;
  name: string;
  children?: readonly RenderTree[];
}

interface RichTreeProps {
  tree: RenderTree;
}

export const RichTree = (props: RichTreeProps) => {
  const renderTree = (nodes: RenderTree) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={`${nodes.name} (${nodes.id})`}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <TreeView
      aria-label='subject tree view'
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
