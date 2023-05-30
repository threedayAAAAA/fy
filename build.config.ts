import { defineBuildConfig } from 'unbuild'
import path from 'path'

export default defineBuildConfig({
    entries: ['src/index'],
    declaration: true,
    clean: true,
    rollup: {
        emitCJS: true,
    },
    alias: {
        '@': path.resolve(__dirname, './src/') + '/',
    },
    failOnWarn: false,
})
