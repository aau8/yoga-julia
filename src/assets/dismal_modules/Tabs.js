import { removeAllClasses } from "Utilities"

// Табы
// data-tab - указывается у контейнера с карточками и табами
// data-tab-btn="<category>" - кнопки(табы), при клике по которым меняется контент. Если указать в значении all, то покажутся все карточки.
// data-tab-content="<category>" - карточки с категорией, к которой они относятся
export default function Tabs() {
	const tabElems = document.querySelectorAll('[data-tab]')

	for (let i = 0; i < tabElems.length; i++) {
		const tab = tabElems[i];
		const btnElems = tab.querySelectorAll('[data-tab-btn]')
		const allContents = tab.querySelectorAll('[data-tab-content]')

		for (let i = 0; i < btnElems.length; i++) {
			const btn = btnElems[i];

			btn.addEventListener('click', e => {
				const btnData = btn.dataset.tabBtn
				const contentElems = tab.querySelectorAll(`[data-tab-content=${btnData}]`)

				removeAllClasses(btnElems, 'is-active')
				removeAllClasses(allContents, 'is-show')

				btn.classList.add('is-active')
				// tabRoller()

				if (btnData === 'all') {
					for (let i = 0; i < allContents.length; i++) {
						const content = allContents[i];

						content.classList.add('is-show')
					}
				}
				else {
					for (let i = 0; i < contentElems.length; i++) {
						const content = contentElems[i];

						content.classList.add('is-show')
					}
				}
			})
		}
	}

	// window.addEventListener('resize', e => {
	//     tabRoller()
	// })

	// Ползунок у табов
	// tabRoller()
	function tabRoller(tab) {
		const roller = tab.querySelector('[data-tab-roller]')
		const tabActive = tab.querySelector('[data-tab-btn].is-active')

		// Определяем ширину ползунка
		roller.style.width = tabActive.clientWidth - parseInt(window.getComputedStyle(tabActive).paddingRight) - parseInt(window.getComputedStyle(tabActive).paddingLeft) + 'px'

		// Определяем отступ слева у ползунка
		roller.style.left = tabActive.offsetLeft + parseInt(window.getComputedStyle(tabActive).paddingRight) + 'px'
	}
}
