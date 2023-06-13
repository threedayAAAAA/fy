import { defineConfig } from 'vitest/config'
import path from 'path'
export default defineConfig({
    test: {
        globals: true,
    },
    resolve: {
        //别名配置，和tsconfig中的alias对应
        alias: [
            {
                find: /^@\//, //这里必须使用正则表达式 //把正则匹配到的地方，@->src
                replacement: path.resolve(__dirname, './src/') + '/',
            },
            {
                find: /^@utils\//, //这里必须使用正则表达式
                replacement: path.resolve(__dirname, './src/utils') + '/',
            },
        ],
    },
})
