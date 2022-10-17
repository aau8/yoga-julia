// Аккордеон для списков
export default function AccordionForList(acc) {
	acc = typeof acc === 'string' ? document.querySelector(acc) : acc
	const list = acc.querySelector('[data-acclist-body]')
	const itemArr = Array.from(list.childNodes)
	const btnMore = acc.querySelector('[data-acclist-more]')
	const showItemsNum = acc.dataset.acclistShowItems
	const isNotNeedHide = showItemsNum >= itemArr.length

	let itemsHeight = null
	let listHeight = null

	init()
	function init() {
		if (isNotNeedHide) {
			btnMore.style.display = 'none'
			return
		}

		const firstItems = itemArr.slice(0, showItemsNum)

		list.style.overflow = 'hidden'
		itemsHeight = firstItems.reduce((accum, e) => accum + e.getBoundingClientRect().height, 0) - parseInt(window.getComputedStyle(firstItems[firstItems.length - 1]).getPropertyValue('padding-bottom')) + 1
		listHeight = itemArr.reduce((accum, e) => accum + e.getBoundingClientRect().height, 0) + 1

		btnMore.addEventListener('click', e => {

			if (acc.classList.contains('is-open')) {
				close()
			}
			else {
				open()
			}
		})

		close()
		acc.classList.add('is-inited')
	}

	function open() {
		list.style.maxHeight = listHeight + 'px'
		acc.classList.add('is-open')
		btnMore.innerText = 'Скрыть'
	}

	function close() {
		list.style.maxHeight = itemsHeight + 'px'
		acc.classList.remove('is-open')
		btnMore.innerText = 'Показать все'
	}

	return Object.freeze({
		open,
		close
	})
}
