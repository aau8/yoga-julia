import vinylFTP from 'vinyl-ftp'

export default function ftp() {
	const ftpConnect = vinylFTP.create({
		host: "37.140.192.24", // Адрес FTP сервера
		user: "u1326657_test", // Имя пользователя
		password: "yF3rN6dA4rwK2p", // Пароль
		parallel: 5 // Кол-во одновременных потоков
	});

	return app.gulp.src(`${app.path.prodFolder}/**/*.*`, {})
		.pipe(ftpConnect.dest(`/${app.path.ftp}`));
}