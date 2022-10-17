// Кнопка "Наверх"
export default function arrowUp() {
	const btn = document.querySelector(".to-top")

	btn.addEventListener("click", e => {
		window.scrollBy(0, -window.scrollY)
	})
}
