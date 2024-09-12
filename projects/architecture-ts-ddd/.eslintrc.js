module.exports = {
    extends: ['eslint-config-codely/typescript'],
    rules: {
        'no-console': 'warn',
        'prettier/prettier': ['error', { printWidth: 120, useTabs: false }]
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            parserOptions: {
                project: ['./tsconfig.json']
            },
            rules: {
                '@typescript-eslint/no-floating-promises': 'warn',
                'prettier/prettier': ['error', { printWidth: 120, useTabs: false }]
            }
        }
    ]
};
