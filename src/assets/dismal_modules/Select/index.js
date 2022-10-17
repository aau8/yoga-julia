/**
 * Модуль селекта
 * @event Select#open - открытие селекта
 * @event Select#close - закрытие селекта
 * @event Select#select - выбор пункта селекта
 * @returns {object} - методы работы с селектами
 */
function Select() {

	window.addEventListener('click', e => {
		const target = e.target

		// Выбор пункта
		if (target.classList.contains('select-dropdown__item') || target.closest('.select-dropdown__item')) {
			const item = target.classList.contains('select-dropdown__item') ? target : target.closest('.select-dropdown__item')

			_selectItem(item)
		}

		// Клик по шапке
		else if (target.classList.contains('select-input') || target.closest('.select-input')) {
			const selectInput = target.classList.contains('select-input') ? target : target.closest('.select-input')
			const select = selectInput.closest('.select')

			if (select.classList.contains('is-open')) {
				close(select)
			}
			else {
				open(select)
			}
		}

		else if (!target.classList.contains('select-dropdown') && !target.closest('.select-dropdown')) {
			const selectOpen = document.querySelector('.select.is-open')

			if (selectOpen) {
				close(selectOpen)
			}
		}
	})

	/**
	 * Создать
	 * @param {string|HTMLElement} selector - селектор или элемент селекта
	 */
	function create(selector) {
		let selectElem

		if (!selector) {
			throw Error('Не указан обязательный параметр selector')
		}
		if (typeof selector === 'string') {
			selectElem = document.querySelector(selector)
		}
		else {
			selectElem = selector
		}

		let selectData = {
			element: selectElem,
			items: Array.from(selectElem.querySelectorAll('.select-dropdown__item')),
		}

		const itemSelected = selectData.items.find(item => item.classList.contains('is-selected'))

		if (itemSelected) {
			_selectItem(itemSelected)
		}

		return Object.freeze({
			...selectData,
			open,
			close,
		})
	}

	/**
	 * Открыть
	 * @param {null|HTMLElement} selectElem - элемент (селект)
	 */
	function open(selectElem) {
		selectElem = selectElem ? selectElem : this.element
		const selectOpen = document.querySelector('.select.is-open')

		if (selectOpen) {
			close(selectOpen)
		}

		selectElem.classList.add('is-open')

		const eventOpen = new Event('open')

		eventOpen.Select = selectElem
		selectElem.dispatchEvent(eventOpen)
	}

	/**
	 * Закрыть
	 * @param {null|HTMLElement} selectElem - элемент (селект)
	 */
	function close(selectElem) {
		selectElem = selectElem ? selectElem : this.element

		selectElem.classList.remove('is-open')

		const eventClose = new Event('close')

		eventClose.Select = selectElem
		selectElem.dispatchEvent(eventClose)
	}

	/**
	 * Выбор пункта из списка
	 * @param {HTMLElement} item - пункт списка селекта
	 */
	function _selectItem(item) {
		const select = item.closest('.select')
		const selectInput = select.querySelector('.select-input')
		const selectTitle = selectInput.querySelector('.select-input__title')
		const selectField = selectInput.querySelector('.select-input__chevron')
		const value = item.dataset.selectValue
		const text = item.textContent

		selectTitle.textContent = text
		selectField.value = value

		if (!select.classList.contains('is-not-empty')) {
			select.classList.add('is-not-empty')
		}

		const itemSelected = select.querySelector('.select-dropdown__item.is-selected')

		if (itemSelected && itemSelected != item) {
			itemSelected.classList.remove('is-selected')
		}

		if (!item.classList.contains('is-selected')) {
			item.classList.add('is-selected')
		}

		const eventSelect = new Event('select')

		eventSelect.Select = select
		select.dispatchEvent(eventSelect)

		close(select)
	}

	return Object.freeze({
		create,
	})
}

export default Select()
