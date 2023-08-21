import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixture__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

//const tests = [
    ///['file1.json', 'file2.json', 'expected-result-stylish.txt']
//];

test('genDiff', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(readFile(('expected-result.txt')));
});
