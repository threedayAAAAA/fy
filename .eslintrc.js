module.exports = {
    root: true,
    parser: "@typescript-eslint/parser", 
    //添加了prettier的拓展
    extends: ["prettier/@typescript-eslint", "plugin:prettier/recommended"],
    plugins: ["@typescript-eslint"],
    env: {
        browser: false,//window对象在这里
        node: true,
    },
    rules: {
        //这些都可以自定义
        "@typescript-eslint/no-explicit-any": "off",
    },
};
