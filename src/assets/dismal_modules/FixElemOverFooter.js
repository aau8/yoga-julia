// Фиксация элемента с position: fixed над подвалом (чтобы не загораживал контент в подвале)
export default function fixElemOverFooter(elem) {
	const footer = document.querySelector('footer')

	window.addEventListener('scroll', fixElem)

	fixElem()
	function fixElem() {
		const footerPageY = footer.getBoundingClientRect().top

		if (footerPageY - window.innerHeight < 0) {
			if (!elem.classList.contains('is-fixed')) {
				elem.style.position = 'absolute'
				elem.style.bottom = document.body.scrollHeight - (footerPageY + window.scrollY) + parseInt(window.getComputedStyle(socialFixed).getPropertyValue('bottom')) + 'px'
				elem.classList.add('is-fixed')
			}
		}
		else {
			elem.removeAttribute('style')
			elem.classList.remove('is-fixed')
		}
	}
}
