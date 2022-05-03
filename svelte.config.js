import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';

import path from 'path';


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
            server: {
                proxy: {
                    // '/nftglee': {
                    //     target: 'https://bid.nftglee.com',
                    //     rewrite: path => path.replace('/nftglee', ''),
                    //     changeOrigin: true,
                    //     secure: false,
                    //     headers: {
                    //         Referer: 'https://bid.nftglee.com/auth/login',
                    //         'Content-Type': 'application/json',
                    //         // Origin: 'https://bid.nftglee.com',
                    //     }
                    // },
                    // '/api': {
                    //     target: 'http://localhost:8091',
                    //     rewrite: (path) => path.replace(/^\/api/, '')
                    // }
                }
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