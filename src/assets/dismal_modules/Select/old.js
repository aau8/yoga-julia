import { removeAllClasses } from "../Utilities.js";

// Списки выбора
export default function Select() {
	// Проверяем есть ли выбранные элементы при загрузке страницы. Если есть, то селект заполняется
	const selectedItemElems = document.querySelectorAll('.select-dropdown__item.is-selected')

	for (let i = 0; i < selectedItemElems.length; i++) {
		const selectedItem = selectedItemElems[i];
		const select = selectedItem.closest('.select')
		const sTitle = select.querySelector('.select-input__title')
		const sInput = select.querySelector('input[type=hidden]')

		sTitle.innerText = selectedItem.textContent.trim()
		sInput.value = selectedItem.dataset.selectValue
		select.inputValue = selectedItem.dataset.selectValue

		select.classList.add('is-valid')
	}

	// Если пользователь кликнул по селекту, то он открывается/закрывается. Также он закроется если кликнуть вне его области
	window.addEventListener('click', e => {
		const target = e.target

		// Если пользователь кликнул вне зоны селекта
		if (!target.classList.contains('select') && !target.closest('.select.is-open')) {

			if (document.querySelector('.select.is-open')) {
				document.querySelector('.select.is-open').classList.remove('is-open')
			}
		}

		// Если пользователь кликнул по шапке селекта
		if (target.classList.contains('select-input')) {
			target.parentElement.classList.toggle('is-open')
		}

		// Если пользователь выбрал пункт из списка селекта
		if (target.classList.contains('select-dropdown__item')) {
			const select = target.closest('.select')
			const sTitle = select.querySelector('.select-input__title')
			const sInput = select.querySelector('input[type=hidden]')
			const neighbourTargets = target.parentElement.querySelectorAll('.select-dropdown__item')

			sTitle.textContent = target.textContent
			sInput.value = target.dataset.selectValue

			removeAllClasses(neighbourTargets, 'is-selected')
			target.classList.add('is-selected')

			select.classList.remove('is-open')
			select.classList.add('is-valid')

			const _eventSelect = new Event('selected')

			select.inputValue = target.dataset.selectValue
			select.dispatchEvent(_eventSelect)
		}
	})
}

Select()
