/**
 * Модальное окно
 */
export default function Popup(modalId, options) {
	const modal = document.querySelector(`[data-modal-id=${modalId}]`)

	return {
		// Открыть модальное окно
		open(modal) {
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
	}
}

const arr = {
	general: {
		lastOpenModal: {
			btnOpen,
			modal: {
				id,
				DOMElement
			},
			btnClose,
		},
		currentOpenModal: {
			btnOpen,
			modal,
		},
		history: []
	},
	modals: {

	}
}
