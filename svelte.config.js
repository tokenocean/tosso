import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';

import path from 'path';
import shim from "@asoltys/vite-plugin-stream-shim";


/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter(),
        vite: {
            resolve: {
                alias: {
                    $components: path.resolve('./src/components'),
                    $icons: path.resolve('./src/icons')
                }
            },
            plugins: [shim()],
            server: {
                proxy: {}
            },
        }
    },
    preprocess: preprocess({
        postcss: true,
        scss: {
            includePaths: ["src"],
            postcss: {
                plugins: [autoprefixer],
            },
        },
    })
};

export default config;