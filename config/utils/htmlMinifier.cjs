const fs = require('fs')
const path = require('path');
const minify = require('html-minifier').minify

function htmlMinifier() {
	const prodPath = path.join(__dirname, '../../prod')

	fs.readdir(prodPath, (err, fileNameArr) => {
		if (err) throw err

		fileNameArr.forEach(fileName => {
			if (fileName.endsWith('.html') && fileName !== 'index.html') {

				fs.readFile(path.join(prodPath, fileName), 'utf-8', (err, data) => {
					if (err) throw err

					const minifyHTML = minify(data, {
						collapseWhitespace: true
					})

					fs.writeFile(path.join(prodPath, fileName), minifyHTML, 'utf-8', err => {
						if (err) throw err
					})
				})
			}
		})
	})
}

module.exports = htmlMinifier
