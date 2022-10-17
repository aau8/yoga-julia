// Плейсхолдер текстовых полей
export default function LabelTextfield(container = document) {
	const tfElems = container.querySelectorAll('.tf')

	for (let i = 0; i < tfElems.length; i++) {
		const textfield = tfElems[i];
		const input = textfield.querySelector('input, textarea')

		if (input.value != '') {
			textfield.classList.add('not-empty')
		}

		input.addEventListener('focus', () => {
			textfield.classList.add('is-focus')
		})

		input.addEventListener('blur', () => {
			textfield.classList.remove('is-focus')

			if (input.value !== '') {
				textfield.classList.add('not-empty')
			}
			else {
				textfield.classList.remove('not-empty')
			}
		})
	}
}
