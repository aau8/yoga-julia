import { bodyLock, bodyUnlock } from "Utilities"

// Увеличение изображения при клике по нему. У изображения должен быть атрибут data-zoom
// Любое изображение у которого есть родитель с классом text будет открываться при клике
export default function ZoomInImg() {
	const TR = 300
	const zoomInImgElems = document.querySelectorAll("[data-zoom], .text img")

	for (let i = 0; i < zoomInImgElems.length; i++) {
		zoomInImgElems[i].style.cursor = "zoom-in"
	}

	window.addEventListener('click', e => {
		const target = e.target

		if (target.getAttribute('data-zoom') != null || target.closest('.text') && target.tagName === 'IMG') {
			const imgSrc = target.getAttribute("src")
			const bigImg = document.createElement("div")

			bigImg.classList.add("big-img")
			bigImg.style.cursor = "zoom-out"
			bigImg.style.setProperty('--zoom-img-transition', TR + 'ms')
			bigImg.innerHTML = `<div class="big-img__body"><img src="${imgSrc}" alt="" data-zoom-out></div>`

			document.querySelector(".wrapper").append(bigImg)

			setTimeout(() => {
				bigImg.classList.add("is-show")
			}, 1)

			bodyLock()
		}

		if (target.getAttribute('data-zoom-out') != null) {
			const bigImg = target.closest('.big-img')

			bigImg.classList.remove("is-show")
			bodyUnlock()

			setTimeout(() => {
				bigImg.remove()
			}, TR)
		}
	})
}
