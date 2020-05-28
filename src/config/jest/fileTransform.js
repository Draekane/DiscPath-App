const path = require('path');

module.exports = {
  process(src, filename) {
    const assetFilename = JSON.stringify(path.basename(filename));

    if (filename.match(/\.svg$/)) {
      return `const React = require('react');
      module.exports = {
        __esModule: true,
        default: ${assetFilename},
        ReactComponent: React.forwardRef((props, ref) => ({
          $$typeof: Symbol.for('react.element'),
          type: 'svg',
          ref: ref,
          key: null,
          props: Object.assign({}, props, {
            children: ${assetFilename}
          })
        })),
      };`;
    }

    return `module.exports = ${assetFilename};`;
  },
};
