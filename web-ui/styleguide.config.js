const path = require('path');

module.exports = {
  title: 'Web UI',
  sections: [
    {
      name: 'UI Components',
      components: './src/components/**/index.js',
    }
  ],
  skipComponentsWithoutExample: true,
  require: [
    // path.join(__dirname, 'node_modules/normalize.css/normalize.css'),
  ],
};
