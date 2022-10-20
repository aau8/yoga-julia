const form = document.getElementById('form-callback')

form.addEventListener('submit', async e => {
	e.preventDefault()

	console.log(window)

	const response = await fetch('./application.php')

	if (response.ok) {

	}
	else {

	}
})
