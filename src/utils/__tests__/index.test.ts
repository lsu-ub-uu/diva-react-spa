import { test, expect } from 'vitest';
import { getTree } from '../index';
import { SelectItem } from '../../components';

/**
 * @vitest-environment jsdom
 */
describe('Utilities', () => {
  test('getTree transforms from flat list to tree', () => {
    const items: SelectItem[] = [
      { id: 'root', name: 'Root', parentId: '-' },
      { id: 'level1', name: 'Level 1', parentId: 'root' },
      { id: 'level12', name: 'Level 1_2', parentId: 'level1' },
      { id: 'level2', name: 'Level 2', parentId: 'root' },
    ];
    const treeData = getTree(items, '-');
    expect(JSON.stringify(treeData)).eq(
      '[{"id":"root","name":"Root","children":[{"id":"level1","name":"Level 1","children":[{"id":"level12","name":"Level 1_2","children":[]}]},{"id":"level2","name":"Level 2","children":[]}]}]',
    );
  });
});
