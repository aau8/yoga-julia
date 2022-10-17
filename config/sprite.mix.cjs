const mix = require('laravel-mix')
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin')
const manifestRemove = require('./utils/manifestRemove.cjs')

mix.disableNotifications()
mix.setPublicPath('src')

mix.webpackConfig({
	plugins: [
		new SVGSpritemapPlugin('./src/icons-to-sprite/*.svg', {
			output: {
				filename: './img/sprite.svg',
				svg: {
					sizes: false,
				},
			},
			sprite: {
				prefix: false,
				generate: {
					use: true,
					view: true,
					symbol: '-sym',
				},
			},
		}),
	],
})

// Удаляем файл mix-manifest.json
mix.after(() => { manifestRemove('./src') })