import genDiff from './index.js';

const tests = [['file1.json', 'file2.json', 'expected-result.txt']];

// eslint-disable-next-line no-undef
describe.each(tests)('Compare data', (file1, file2, expected) => {
  test('Compare data', () => {
    (expect(genDiff(file1, file2)).toEqual((expected), 'utf8'));
  });
});
