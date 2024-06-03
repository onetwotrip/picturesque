import { svelte } from '@sveltejs/vite-plugin-svelte'
import { browserslistToTargets } from 'lightningcss'
import { createHtmlPlugin } from 'vite-plugin-html'
import browserslist from 'browserslist'
import { defineConfig } from 'vite'
import os from 'node:os'

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
    modules: {
      generateScopedName:
        process.env.NODE_ENV === 'development'
          ? '[local]--[hash:base64:4]'
          : '[hash:base64:4]',
    },
    lightningcss: {
      targets: browserslistToTargets(browserslist('>= 0.25%')),
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
