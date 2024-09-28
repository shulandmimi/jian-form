import { defineConfig } from '@farmfe/core';
import dts from '@farmfe/js-plugin-dts';

export default defineConfig({
    compilation: {
        input: {
            index: './src/index.ts',
        },
        output: {
            targetEnv: 'library-browser',
        },
        lazyCompilation: false,
        external: ['react', 'react-dom', 'jsonpath'],
        partialBundling: {
            enforceResources: [
                {
                    name: 'index',
                    test: ['.+'],
                },
            ],
        },
    },
    plugins: ['@farmfe/plugin-react', dts({})],
});
