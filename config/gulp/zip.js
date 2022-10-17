import { deleteSync } from 'del'
import zipPlugin from 'gulp-zip'

export default function zip() {
	deleteSync(`./${app.path.rootFolder}.zip`)

	return app.gulp.src(`${app.path.prodFolder}/**/*.*`, {})
		.pipe(zipPlugin(`${app.path.rootFolder}.zip`))
		.pipe(app.gulp.dest('./'))
}