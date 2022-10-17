/**
 * Открытие/закрытие моб. меню
 * @param {string|HTMLElement} selector - класс меню или элемент
 */

import { bodyLock, bodyUnlock } from './Utilities.js'

export default class Menu {

	constructor(selector) {
		this.menu = typeof selector === 'string' ? document.querySelector('.menu') : selector
		this.menuIsOpen = false

		this._init()
	}

	/**
	 * Инициализация меню
	 */
	_init() {
		document.addEventListener('click', e => {

			if (e.target.classList.contains('[data-menu-close]') || e.target.closest('[data-menu-close]')) {
				console.log(this.close())
			}

			if (e.target.classList.contains('menu') && this.menuIsOpen) {
				this.close()
			}

			if (e.target.classList.contains('[data-menu-open]') || e.target.closest('[data-menu-open]')) {
				this.open()
			}
		})

		window.Menu = this
	}

	/**
	 * Открытие меню
	 * @return {undefined} Если меню открыто
	 */
	open() {
		if (this.menuIsOpen) return

		this.menu.classList.add('is-show')
		bodyLock()

		this.menuIsOpen = true
		this._addEvent('open')

		console.log(window.Menu)
	}

	/**
	 * Закрытие меню
	 * @return {undefined} Если меню закрыто
	 */
	close() {
		if (!this.menuIsOpen) return

		this.menu.classList.remove('is-show')
		bodyUnlock()

		this.menuIsOpen = false
		this._addEvent('close')

		console.log(window.Menu)
	}

	/**
	 *
	 * @param {string} eventName - название события
	 * @param {Object} options - добавляемые опции при вызове события
	 */
	_addEvent(eventName, options) {
		const event = new Event(eventName)

		event.Menu = this

		if (options && typeof options === 'object') event.Menu[options.key] = options.value

		this.menu.dispatchEvent(event)
	}
}
