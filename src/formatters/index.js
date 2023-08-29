import stylish from './stylish.js';

// eslint-disable-next-line consistent-return
export default (data, format) => {
  // eslint-disable-next-line default-case
  switch (format) {
    case 'stylish':
      return stylish(data);
  }
};
