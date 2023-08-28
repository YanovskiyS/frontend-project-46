import fs from 'fs';
import _ from 'lodash';
import parser from './parser.js';

const getFormat = (filepath) => filepath.split('.')[1];

const genDiff = (obj1, obj2) => {
  const data1 = parser(fs.readFileSync(obj1, 'utf8'), getFormat(obj1));
  const data2 = parser(fs.readFileSync(obj2, 'utf8'), getFormat(obj2));
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const allKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(allKeys);

  const result = sortedKeys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { type: 'object', key, value: genDiff(data1[key], data2[key]) };
    }
    if (!Object.hasOwn(data1, key)) {
      return { type: 'added', key, value: data2[key] };
    }
    if (!Object.hasOwn(data2, key)) {
      return { type: 'deleted', key, value: data1[key] };
    }
    if (data1[key] !== data2[key]) {
      return {
        type: 'changed', key, oldValue: data1[key], newValue: data2[key],
      };
    }

    return { type: 'unchanged', key, value: data1[key] };
  });

  // eslint-disable-next-line array-callback-return, consistent-return
  return result.map((pair) => {
    if (pair.type === 'added') return `+ ${pair.key}: ${pair.value}`;
    if (pair.type === 'deleted') return `- ${pair.key}: ${pair.value}`;
    if (pair.type === 'object') return `- ${pair.key}: ${pair.value}`;
    if (pair.type === 'changed') return `- ${pair.key}: ${pair.oldValue}\n+ ${pair.key}: ${pair.newValue}`;
    if (pair.type === 'unchanged') return `  ${pair.key}: ${pair.value}`;
  }).join('\n');
};

export default genDiff;
