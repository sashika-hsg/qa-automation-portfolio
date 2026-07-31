module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: ['step-definitions/**/*.ts', 'support/**/*.ts'],
    requireModule: ['ts-node/register', 'tsconfig-paths/register'],
    format: ['progress', 'html:reports/cucumber/report.html'],
    publishQuiet: true,
    timeout: 30000,
  },
};
