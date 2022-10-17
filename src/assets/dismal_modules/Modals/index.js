import { bodyLock, bodyUnlock } from "../Utilities.js"

/**
 * Модальное окно
 *
 * INFO: Атрибуты (все атрибуты находятся в св-ве attrs)
 * data-modal-id="<id-modal>" - (modalId) каждая модалка имеет этот атрибут, в котором мы указываем ее id
 * data-close-on-bg - (modalCloseOnBg) модалка, которая должна закрываться при клике по ее фону, должна иметь этот атрибут
 * data-modal-open="<id-modal>" - (btnModalOpen) имеет элемент, при нажатии на который открывается модалка
 * data-modal-close="<id-modal || Null>" - (btnModalClose) имеет элемент, при нажатии на который, модальное окно закрывается. Если елемент находится внутри модалки, которую он должен закрыть, в значении атрибута указывать id модалки необязательно (можно оставить его пустым). Значение стоит указывать, если элемент, который должен закрыть модалку, находится вне контейнера с атрибутом data-modal-id
 *
 * INFO: Свойства
 * attrs - (Object) названия атрибутов
 * classNames - (Object) названия классов
 * modalList - (NodeList) список всех модальных окон (для обновления списка использовать updateModalList())
 * openingBtnList - (NodeList) список открывающих кнопок
 * modalIsShow - (Boolean) модальное окно показано
 * modalShow - (Element) показанное модальное окно
 * modalShowId - (String) id показанного модального окна
 * keyEsc - (Boolean) закрывать модалки при нажатии клавиши Esc. По умолчанию - true
 * useHash - (Boolean) использовать хеш. Если в url указан хеш равный id модалки, модалка откроется. По умолчанию - true
 * historyHash - (Boolean) сохранять хеш в истории браузера. Если useHash === false, то historyHash будет равен false. По умолчанию - false
 * hash - (String) значение хеша
 *
 * INFO: Функции
 * open(<String || Element>) - метод, открывающий модалку
 * close(<String || Element || Null>) - метод, закрывающий модалку. Если скобки оставить пустыми, закроется открытая модалка
 * update() - метод, обновляющий список модалок (this.modalList) и список кнопок (this.openingBtnList)
 * updateModalList() - метод, обновляющий список модалок (this.modalList)
 * updateOpeningBtnList() - метод, обновляющий список кнопок (this.openingBtnList)
 *
 *
 * TODO: Что еще можно сделать
 * (Атрибуты data-modal-hash и data-modal-hash-history. В случае если this.useHash === false)
 * data-modal-hash - указывается у модалки, которая должна открываться по хешу
 * data-modal-hash-history - указывается у модалки, которая должна быть сохранена в истории ( использовать вместе с первым атрибутом )
 * Прописать возомжные ошибки
 * Анимацию появления с помощью js
 * Если указан id модалки при загрузке страницы, то модалка должна открываться без плавной анимации
 * События
 * Если при this.useHash = true, до открытия модалки в url был указан хеш не принадлежащий ни к одной модалке, то при закрытии модалки в url должен указываться тот самый хеш
 * Возможность открытия нескольких модалок
 * Закрытие/открытие модалок по таймеру
 */
export default class Modals {
	attrs = {
		modalId: 'data-modal-id',
		modalCloseOnBg: 'data-close-on-bg',
		btnModalOpen: 'data-modal-open',
		btnModalClose: 'data-modal-close',
	}
	classNames = {
		modalShow: 'is-show',
		modalBg: 'modal__bg',
	}
	modalList = document.querySelectorAll(`[${this.attrs.modalId}]`)
	openingBtnList = document.querySelectorAll(`[${this.attrs.btnModalOpen}]`)
	openBtn = null
	modalIsShow = false
	modalShow = null
	modalShowId = null
	keyEsc = true
	useHash = true
	historyHash = !this.useHash ? false : false
	hash = null

	constructor(options) {
		this._init()
	}

	// Открыть модальное окно
	open(modal) {
		if (typeof modal === 'string') {
			modal = document.querySelector(`[${this.attrs.modalId}=${modal}]`)
		}

		this.modalIsShow = true
		this.modalShow = modal
		this.modalShowId = modal.dataset.modalId

		this._modalBgClose()
		modal.classList.add(this.classNames.modalShow)
		bodyLock()

		// Событие открытия модалки
		const _eModalOpenStart = new Event('modal-open')
		_eModalOpenStart.data = { ...this }

		modal.dispatchEvent(_eModalOpenStart)
	}

	// Закрыть модальное окно
	close(modal) {
		if (typeof modal === 'undefined') {
			if (this.modalShow != null) {
				modal = this.modalShow
			}
			else {
				console.error('[Modals]: Все модальные окна закрыты')
				return
			}
		}
		if (typeof modal === 'string') {
			modal = document.querySelector(`[${this.attrs.modalId}=${modal}]`)
		}
		if (this.modalShow.dataset.closeOnBg != undefined) {
			this._modalBg.removeEventListener('click', this._bgEvent)
		}

		// Событие закрытия модалки
		const _eModalOpenClose = new Event('modal-close')
		_eModalOpenClose.data = { ...this }

		modal.dispatchEvent(_eModalOpenClose)

		this.modalIsShow = false
		this.modalShow = null
		this.modalShowId = null

		modal.classList.remove(this.classNames.modalShow)
		bodyUnlock()
	}

	// Получить модальное окно
	get(modalName) {
		if (typeof modalName === 'string') {
			return this.modalList.find(e => e.getAttribute(`${this.attrs.modalId}`) === modalName) || null
		}
		else if (typeof modalName === 'object') {
			return modalName.map(modalName => this.modalList.find(e => e.getAttribute(`${this.attrs.modalId}`) === modalName) || null)
		}
		else {
			return this.modalList
		}
	}

	// Обновляет список модалок и кнопок
	update() {
		this.updateModalList()
		this.updateOpeningBtnList()
	}

	// Обновить список модальных окон
	updateModalList() {
		this.modalList = document.querySelectorAll(`[${this.attrs.modalId}]`)
	}

	// Обновить список кнопок, открывающих модальные окна
	updateOpeningBtnList() {
		this.openingBtnList = document.querySelectorAll(`[${this.attrs.btnModalOpen}]`)
	}

	// Инизиализация Modal
	_init() {
		if (!document.querySelector('[data-modal-id]')) {
			console.warn('[Modals]: Модальные окна не найдены!')
			return
		}
		this._btnOpen()
		this._btnClose()
		if (this.keyEsc) this._keyEscClose()
		if (this.useHash) this._watchHash()
	}

	// Открыть модалку при клике по кнопке c атрибутом this.attrs.btnModalOpen
	_btnOpen() {
		document.addEventListener('click', e => {
			if (e.target.dataset.modalOpen != undefined || e.target.closest(`[${this.attrs.btnModalOpen}]`)) {
				const btnOpenModal = e.target.dataset.modalOpen != undefined ? e.target : e.target.closest(`[${this.attrs.btnModalOpen}]`)

				this.openBtn = btnOpenModal

				this.open(btnOpenModal.dataset.modalOpen)
				if (this.useHash) this._setHash()
			}
		})
	}

	// Закрыть модалку при клике по кнопке с атрибутом this.attrs.btnModalClose
	_btnClose() {
		document.addEventListener('click', e => {
			if (e.target.dataset.modalClose != undefined || e.target.closest(`[${this.attrs.btnModalClose}]`)) {
				if (this.useHash) this._clearHash()
				this.close(document.querySelector(`[${this.attrs.modalId}=${this.modalShowId}]`))
			}
		})
	}

	// Закрытие модалки при клике по фону. Работает только у модалок, у которых ест атрибут this.attrs.modalCloseOnBg
	_modalBgClose() {
		if (this.modalShow.dataset.closeOnBg === undefined) return

		this._modalBg = this.modalShow.querySelector(`.${this.classNames.modalBg}`)
		this._bgEvent = () => {
			if (this.useHash) this._clearHash()
			this.close(this.modalShow)
		}

		this._modalBg.addEventListener('click', this._bgEvent, { once: true })
	}

	// Закрытие модалки при нажатии клавиши Esc
	_keyEscClose() {
		document.addEventListener('keydown', e => {
			if (e.key === 'Escape') {
				if (this.useHash) this._clearHash()
				this.close()
			}
		})
	}

	// Следим за хешем
	_watchHash() {
		this._checkHash()
		if (this.historyHash) {
			window.addEventListener('hashchange', e => {
				this._checkHash()
			})
		}
	}

	// Проверка хеша
	_checkHash() {
		const hash = window.location.hash.replace('#', '')
		this.hash = (hash === '') ? null : hash

		if (hash != '' && document.querySelector(`[data-modal-id=${hash}]`)) {
			this.open(hash)
		}
		if (hash === '' && this.historyHash && this.modalShow) {
			this.close()
		}
	}

	// Установка хеша, равного id модалки
	_setHash() {
		const href = location.origin + location.pathname + '#' + this.modalShowId
		history[this.historyHash ? 'pushState' : 'replaceState']({}, '', href)
	}

	// Удаление хеша
	_clearHash() {
		const href = location.href.replace(/#[\w-]+/, '');
		history[this.historyHash ? 'pushState' : 'replaceState']({}, '', href)
	}
}
