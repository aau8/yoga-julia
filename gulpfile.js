import gulp from 'gulp'
import path from 'path'

// Импортирование задач
import ftp from './config/gulp/ftp.js'
import zip from './config/gulp/zip.js'

// Глобальные переменные
global.app = {
	gulp,
	path: {
		tasks: './config/gulp',
		ftp: '',
		prodFolder: './prod',
		srcFolder: './src',
		rootFolder: path.basename(path.resolve())
	}
}

export { ftp }
export { zip }