import LabelTextfield from "../dismal_modules/LabelTextfield.js"
import Modals from "../dismal_modules/Modals/index.js"


const form = document.getElementById('form-callback')

form.addEventListener('submit', async e => {
	e.preventDefault()

	const formData = new FormData(form)

	const response = await fetch('./application.php', {
		method: 'POST',
		body: formData
	})

	if (response.ok) {
		form.reset()
		LabelTextfield(form)
		Modals.open(Modals.get('callback-success'))

		setTimeout(() => {
			Modals.close(Modals.get('callback-success'))
		}, 3000)
	}
	else {
		Modals.open(Modals.get('callback-error'))

		setTimeout(() => {
			Modals.close(Modals.get('callback-error'))
		}, 5000)

		console.error(response.statusText)
	}
})
