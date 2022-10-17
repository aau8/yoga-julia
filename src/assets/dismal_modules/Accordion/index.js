/**
 * Аккордеоны
 */

function Accordion() {
	let list = {}

	// Делегирование событий для открытия и закрытия аккордеонов при клике по элементам с атрибутом data-acc-toggler
	document.addEventListener('click', e => {
		const target = e.target

		if (target.hasAttribute('data-acc-toggler') || target.closest('[data-acc-toggler]')) {
			const togglerElem = target.hasAttribute('data-acc-toggler') ? target : target.closest('[data-acc-toggler]')
			const togglerData = togglerElem.dataset.accToggler
			const accElem = togglerData ? document.querySelector(`[data-acc=${togglerData}]`) : togglerElem.closest(`[data-acc]`)

			if (!accElem) {
				throw Error('[Accordion]: Аккордеон не найден!')
			}
			if (!accElem.Accordion) {
				throw Error('[Accordion]: Аккордеон не инициализирован!')
			}

			if (accElem.Accordion.isOpen) {
				close(accElem.Accordion.key)
			}
			else {
				open(accElem.Accordion.key)
			}
		}
	})

	/**
	 * Создает аккордеон
	 * @param {string|HTMLElement} key - ключ аккордеона. Может являться html-элементом или быть значением атрибута data-acc. В любом случае, у аккордеона должен быть атрибут data-acc с уникальным значением.
	 * @param {string} option.group - идентификатор группы аккордеонов. Указывается для того, чтобы при открытие аккордеона, закрывались все остальные, находящиеся в этой группе. id группы можно указать также с помошью атрибута data-acc-group. Если он указан, параметр group проигнорируется.
	 * @param {string} option.isOpen - аккордеон по умолчанию открыт/закрыт
	 */
	function create(key, option = {}) {
		let accElem

		if (!key) {
			throw Error('[Accordion]: Ключ аккордеона не указан!')
		}

		if (typeof key === 'string') {
			accElem = document.querySelector(`[data-acc=${key}]`)
		}
		else {
			accElem = key
		}

		if (!accElem) {
			throw Error('[Accordion]: Аккордеон не найден!')
		}

		let acc = {
			key: accElem.dataset.acc,
			element: accElem,
			group: accElem.dataset.accGroup || option.group || null,
			isOpen: accElem.classList.contains('is-open') || option.isOpen,
			height: accElem.scrollHeight
		}

		// Добавляем элементу (аккордеону) его данные аккордеона
		accElem.Accordion = acc

		// Записываем данные аккордеона в объект list
		writeToList(acc)

		if (acc.isOpen) {
			open(acc.key)
		}
		else {
			close(acc.key)
		}

		return Object.freeze({
			...acc,
			open,
			close
		})
	}

	/**
	 * Открыть аккордеон
	 * @param {null|string} key - ключ аккордеона. Ключ можно не указывать, если метод вызывается у полученного аккордеона
	 */
	function open(key) {
		const acc = key ? get(key) : this
		const parent = acc.element.parentElement.closest('[data-acc]')
		// Дочерние аккордеоны
		const childArr = Array.from(acc.element.querySelectorAll('[data-acc]'))
		// Общее значение макс. высоты дочерних аккордеонов
		const generalMaxHeightOpenAccChild = childArr.filter(e => e.Accordion.isOpen).reduce((a, e) => a + parseInt(e.style.maxHeight), 0)


		// Добавить фильтр: аккордеон не является открывающимся аккордеоном
		if (acc.group) {
			getGroup(acc.group).filter(e => e.isOpen).forEach(e => {
				close(e.key)
			})
		}

		if (!acc.isOpen) {
			acc.element.classList.add('is-open')
			acc.element.style.opacity = 1
			acc.element.style.visibility = 'visible'
			acc.isOpen = true

			// Всем тоглерам связанных с данным аккордеоном, добавляем класс acc-is-open
			document.querySelectorAll(`[data-acc-toggler=${acc.key}]`).forEach(e => e.classList.add('acc-is-open'))
		}

		// Задаем максимальную высоту аккордеону
		acc.element.style.maxHeight = acc.element.scrollHeight + generalMaxHeightOpenAccChild + 'px'

		writeToList(acc)

		// Если у аккордеона есть родитель, он повторно откроется
		if (parent) {
			open(parent.Accordion.key)
		}
	}

	/**
	 * Закрыть аккордеон
	 * @param {null|string} key - ключ аккордеона. Ключ можно не указывать, если метод вызывается у полученного аккордеона
	 */
	function close(key) {
		const acc = key ? get(key) : this

		acc.element.classList.remove('is-open')
		acc.element.style.maxHeight = 0
		acc.element.style.opacity = 0
		acc.element.style.visibility = 'hidden'
		acc.isOpen = false

		// У всеч тоглеров связанных с данным аккордеоном, удаляем класс acc-is-open
		document.querySelectorAll(`[data-acc-toggler=${acc.key}]`).forEach(e => e.classList.remove('acc-is-open'))

		writeToList(acc)
	}

	/**
	 * Записывает/перезаписывает данные аккордеона в объект list
	 * @param {Object} data - данные аккордеона
	 */
	function writeToList(data) {
		const group = data.group

		// Если у аккордеона не указана группа
		if (group === null) {

			// Если такой группы не существует
			if (!list.withoutGroup) {
				list.withoutGroup = []
			}

			const existAcc = list.withoutGroup.find(e => e.key === data.key)

			// Если аккордеон существует, мы перезаписываем его данные, если нет, добавляем в массив
			if (existAcc) {
				Object.assign(existAcc, data)
			}
			else {
				list.withoutGroup.push(data)
			}
		}
		// Если указана
		else {

			// Если такой группы не существует
			if (!list[group]) {
				list[group] = []
			}

			const existAcc = list[group].find(e => e.key === data.key)

			// Если аккордеон существует, мы перезаписываем его данные, если нет, добавляем в массив
			if (existAcc) {
				Object.assign(existAcc, data)
			}
			else {
				list[group].push(data)
			}
		}
	}

	/**
	 * Получает аккордеон по ключу из объекта list
	 * @param {string} key - ключ аккордеона
	 * @return Объект с данными акордеона
	 */
	function get(key) {
		const listArray = Object.entries(list)

		for (let i = 0; i < listArray.length; i++) {

			for (let e = 0; e < listArray[i][1].length; e++) {
				const acc = listArray[i][1][e];

				if (acc.key === key) {
					return {
						...acc,
						open,
						close
					}
				}
			}
		}
	}

	/**
	 * Получает аккордеоны указанной группы
	 * @param {string} group - название группы
	 * @returns Объект с данными аккордеонов
	 */
	function getGroup(group) {
		if (!list[group]) {
			throw Error('[Accordion]: Указанной группы несуществует!')
		}

		return list[group]
	}

	/**
	 * Получает полный список аккордеонов
	 * @returns объект
	 */
	function getList() {
		return list
	}

	return Object.freeze({
		list,
		create,
		get,
		getGroup,
		getList,
		open,
		close,
	})
}

export default Accordion()
