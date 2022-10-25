import '../dismal_modules/Signa/index.js'
import Modals from '../dismal_modules/Modals/index.js'
import LabelTextfield from '../dismal_modules/LabelTextfield.js'

// const modals = new Modals()
const textfieldLabels = LabelTextfield()

import './Callback.js'
import { isMobile } from '../dismal_modules/Utilities.js'

// WOW JS
// new WOW({
// 	offset: isMobile.any() ? 0 : 150,
// 	live: false,
// }).init();

AOS.init({
	offset: isMobile.any() ? 0 : 300,
	duration: 1000,
});
