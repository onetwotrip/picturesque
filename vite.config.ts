import { svelte } from '@sveltejs/vite-plugin-svelte'
import { browserslistToTargets } from 'lightningcss'
import { createHtmlPlugin } from 'vite-plugin-html'
import { fileURLToPath } from 'node:url'
import browserslist from 'browserslist'
import { defineConfig } from 'vite'
import path from 'node:path'
import os from 'node:os'

let dirname = fileURLToPath(path.dirname(import.meta.url))

export default defineConfig({
  plugins: [
    createHtmlPlugin({
      minify: {
        removeStyleLinkTypeAttributes: true,
        removeScriptTypeAttributes: true,
        removeRedundantAttributes: true,
        collapseBooleanAttributes: true,
        removeEmptyAttributes: true,
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        keepClosingSlash: true,
        useShortDoctype: true,
        removeComments: true,
        minifyURLs: true,
        minifyCSS: true,
        minifyJS: true,
        html5: true,
      },
    }),
    svelte(),
  ],
  css: {
    lightningcss: {
      targets: browserslistToTargets(
        browserslist(null, {
          config: path.join(dirname, '.browserslistrc'),
        }),
      ),
    },
    modules: {
      generateScopedName:
        process.env.NODE_ENV === 'development'
          ? '[local]--[hash:base64:4]'
          : '[hash:base64:4]',
    },
    transformer: 'lightningcss',
  },
  resolve: {
    extensions: ['.js', '.ts', '.svelte', '.css'],
    alias: {
      '~': __dirname,
    },
  },
  server: {
    host: os.networkInterfaces().eth0?.[0].address,
    port: 3000,
  },
  esbuild: {
    legalComments: 'none',
  },
})
