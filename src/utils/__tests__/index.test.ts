import { test, expect } from 'vitest';
import { getFlat, getTree } from '../index';
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
  test('getFlat transforms from tree to flat list', () => {
    const treeData = {
      id: 'root',
      name: 'Research Subjects',
      children: [
        {
          id: '1',
          name: 'Biology',
          children: [
            {
              id: '11',
              name: 'Genetics',
              children: [
                { id: '111', name: 'Molecular genetics' },
                { id: '112', name: 'Population genetics' },
              ],
            },
            { id: '12', name: 'Ecology' },
            { id: '13', name: 'Evolution' },
            { id: '14', name: 'Cellular biology' },
          ],
        },
        {
          id: '2',
          name: 'Computer Science',
          children: [
            { id: '21', name: 'Artificial intelligence' },
            { id: '22', name: 'Machine learning' },
            { id: '23', name: 'Data structures' },
            { id: '24', name: 'Algorithms' },
          ],
        },
        {
          id: '3',
          name: 'Psychology',
          children: [
            { id: '31', name: 'Social psychology' },
            { id: '32', name: 'Cognitive psychology' },
            { id: '33', name: 'Neuroscience' },
            { id: '34', name: 'Developmental psychology' },
          ],
        },
        {
          id: '4',
          name: 'Physics',
          children: [
            { id: '41', name: 'Quantum mechanics' },
            { id: '42', name: 'Astrophysics' },
            { id: '43', name: 'Particle physics' },
            { id: '44', name: 'Thermodynamics' },
          ],
        },
      ],
    };
    const listData = getFlat(treeData, '-');
    expect(listData.length).eq(23);
  });
});
