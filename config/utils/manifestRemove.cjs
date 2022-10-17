const fs = require('fs')
const path = require('path')

function manifestRemove(manifPath = '') {
	fs.readFile(path.join(manifPath, 'mix-manifest.json'), 'utf-8', err => {
		if (err) return

		fs.unlink(path.join(manifPath, 'mix-manifest.json'), () => {
			console.log('Файл mix-manifest.json успешно удален!')
		})
	})
}

module.exports = manifestRemove