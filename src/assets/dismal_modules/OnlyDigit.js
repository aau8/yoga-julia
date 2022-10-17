// Только цифры и точка в инпутах
// data-only-digit - текстовое поле должно иметь этот атрибут
export function onlyDigit() {
	const inputDigitElems = document.querySelectorAll('[data-only-digit]')

	for (let i = 0; i < inputDigitElems.length; i++) {
		const input = inputDigitElems[i];

		input.addEventListener('keydown', e => {
			if (e.key.search(/[\d\.]/)) {
				e.preventDefault()
			}
		})

		input.addEventListener('paste', e => {
			if (e.clipboardData.getData('text/plain').search(/[\d\.]/)) {
				e.preventDefault()
			}
		})
	}
}
