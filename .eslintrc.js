module.exports = {
    root: true,
    env: {
        node: true,
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-extra-semi': 'error',
        'quotes': ["error", "single"]
    },
    parser: "vue-eslint-parser",
    plugins: ["typescript"],
    parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: "module",
        ecmaVersion: 6,
        ecmaFeatures: {
            modules: true
        }
    }
};
