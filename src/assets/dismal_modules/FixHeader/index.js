// Фиксирование меню при скролле
export default function FixHeader() {
	const header = document.querySelector('header')

	if (!header) return

	const headerArea = header.querySelector('.header__area')
	let elY = 0;
	let scrollY = 0;

	header.style.height = headerArea.clientHeight + 'px'

	fixedHeader()
	window.addEventListener('scroll', fixedHeader)

	function fixedHeader() {
		const el = document.querySelector('.header');
		const height = el.offsetHeight;
		const pos = window.pageYOffset;
		const diff = scrollY - pos;

		elY = Math.min(0, Math.max(-height, elY + diff));

		if (elY < 0) {
			headerArea.classList.remove('is-show')
		}
		else {
			headerArea.classList.add('is-show')
		}

		scrollY = pos;

		if (window.scrollY > 200) {
			if (!headerArea.classList.contains('is-fixed')) {
				headerArea.classList.add('is-fixed')
				headerArea.style.top = -headerArea.clientHeight + 'px'
			}
		}
		else if (window.scrollY === 0) {

			if (headerArea.classList.contains('is-fixed')) {
				headerArea.classList.remove('is-show')
				headerArea.classList.remove('is-fixed')
				headerArea.style.top = 0
			}
		}
	}
}

// Отступ при скроле
document.addEventListener('click', e => {

	if (e.target.tagName === 'A' && e.target.getAttribute('href').includes('#')) {
		const section = document.querySelector(e.target.hash)

		e.preventDefault()

		if (section) {
			window.scrollTo(0, section.getBoundingClientRect().top - 50)
		}
	}
})
