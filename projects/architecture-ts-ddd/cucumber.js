/* eslint-disable camelcase */
const common = [
    '--require-module ts-node/register' // Load TypeScript module
];

const frontoffice_backend = [
    ...common,
    'tests/apps/frontoffice/backend/features/**/*.feature',
    '--require tests/apps/frontoffice/backend/features/stepDefinitions/*.steps.ts'
].join(' ');

module.exports = {
    frontoffice_backend
};
