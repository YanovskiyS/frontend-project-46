import _ from 'lodash';

const compareFiles = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const allKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(allKeys);

  const result = sortedKeys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { type: 'object', key, value: compareFiles(data1[key], data2[key]) };
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

  return result;
};

export default compareFiles;
