import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixture__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

// eslint-disable-next-line no-undef
test('genDiff json', () => {
  // eslint-disable-next-line no-undef
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(readFile(('expected-result.txt')));
});

// eslint-disable-next-line no-undef
test('genDiff yml', () => {
  // eslint-disable-next-line no-undef
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual(readFile(('expected-result.txt')));
});
