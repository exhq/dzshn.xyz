module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    plugins: ["svelte3", "@typescript-eslint"],
    overrides: [{ files: ["*.svelte"], processor: "svelte3/svelte3" }],
    settings: {
        "svelte3/typescript": () => require("typescript"),
    },
    parserOptions: {
        sourceType: "module",
        ecmaVersion: 2020,
    },
    env: {
        browser: true,
        es2017: true,
        node: true,
    },
    rules: {
        "no-duplicate-imports": ["error"],

        "arrow-body-style": ["error", "as-needed"],
        "no-var": ["error"],
        "prefer-const": ["error"],

        "comma-dangle": ["error", "always-multiline"],
        "eol-last": ["error", "always"],
        "indent": ["error", 4],
        "no-trailing-spaces": ["error"],
        "quotes": ["error", "double", { avoidEscape: true }],
        "semi": ["error", "always"],
    },
};
