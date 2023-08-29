import _ from 'lodash';

const indent = (deph, spasesCount = 4) => ' '.repeat(deph * spasesCount);
const shortIndent = (deph, spasesCount = 4) => ' '.repeat(deph * spasesCount - 2);

const formattedValue = (value, deph) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }

  const lines = Object.entries(value).map(([key, val]) => `${indent(deph + 1)}${key}: ${formattedValue(val, deph + 1)}`);

  return [
    '{',
    ...lines,
    `${indent(deph)}}`,
  ].join('\n');
};

const stylish = (value) => {
  const signs = {
    plus: '+ ',
    minus: '- ',
    space: '  ',
  };

  const iter = (tree, depth) => {
    const result = tree.map((node) => {
      const getValue = (val, sign) => `${shortIndent(depth)}${sign}${node.key}: ${formattedValue(val, depth)}\n`;
      switch (node.type) {
        case 'added':
          return getValue(node.value, signs.plus);
        case 'deleted':
          return getValue(node.value, signs.minus);
        case 'unchanged':
          return getValue(node.value, signs.space);
        case 'changed':
          return `${getValue(node.oldValue, signs.minus)}${getValue(node.newValue, signs.plus)}`;
        case 'object':
          return `${indent(depth)}${node.key}: {\n${iter(node.value, depth + 1).join('')}${indent(depth)}}\n`;
        default:
          return 'Error';
      }
    });
    return result;
  };
  return `{\n${iter(value, 1).join('')}}`;
};

export default stylish;
