import Swiper, { Navigation, Pagination } from "swiper";
// import 'swiper/css'

/**
 * Базовые методы и свойства библиотеки Swiper
 * @param {SwiperModule[]} modules - используемые модули в слайдере
 * @param {Boolean} loop - сделать слайдер бесконечным
 *
 * @param {Object} navigation (module Navigation) - стрелки навигации {@link https://swiperjs.com/swiper-api#navigation}
 * @param {Object} pagination (module Pagination) - пагинация {@link https://swiperjs.com/swiper-api#pagination}
 * @param {Boolean|Object} scrollbar (module Scrollbar) - скролбар {@link https://swiperjs.com/swiper-api#scrollbar}
 */

const mainSwiper = new Swiper("[data-swiper=main]", {
	modules: [Navigation, Pagination],

	slidesPerView: 1,
	spaceBetween: 24,
});
