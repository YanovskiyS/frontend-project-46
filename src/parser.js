// eslint-disable-next-line import/no-extraneous-dependencies
import yaml from 'js-yaml';

const parser = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.load(data);
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Uncnown format "${format}"`);
  }
};
export default parser;
