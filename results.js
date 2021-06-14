console.log('> ...')

// ______________________________ ✅ VARIABLES DE LA API ___________________
// API
const url = 'https://api.punkapi.com/v2/beers/'
const search = '?'
const and = '&'
// API default values
let _beer_nm = ''
let _page_nmb = 1
let _per_pg = 25
let _abv_min = 0
let _abv_max = 100 
let url_to_fetch = url
let _show_as = 'show_grid'
let _sort_by = 'default'
let _sort_order = true

// SELECTOR
const filter_section = document.querySelector('.filter')
const filter_close = document.querySelector('#filter_close')
const filter_open = document.querySelector('#filter_open')
const filter_search = document.querySelector('#search_string')
const input_by_page = document.querySelector('#page')
const input_abv_min = document.querySelector('#avb-min')
const input_abv_max = document.querySelector('#avb-max')
const input_sort = document.querySelector('#sort')
const input_show_grid = document.querySelector('#show_grid')
const input_show_list = document.querySelector('#show_list')
const button_search = document.querySelector('#btn_search')
const button_apply = document.querySelector('#btn_apply')
const button_random = document.querySelector('#btn_random')
const button_clear = document.querySelector('#btn_clear')

const tag_section = document.querySelector('.tag')
const clear_tag = document.querySelector('.tag__clear')
const tag_container = document.querySelector('.tag__cont')

const header_section = document.querySelector('.header')
const hero_section = document.querySelector('.hero')
const main_title = document.querySelector('.main__title')

const random_section = document.querySelector('.random')

const card_section = document.querySelector('.card')
const card_cont = document.querySelector('.card__cont')
const card_cont_card = document.querySelectorAll('.card__cont__card')
const card_cont_card_title = document.querySelectorAll('.card__cont__card__title')
const card_cont_card_abv = document.querySelectorAll('.card__cont__card__ABV')
const card_cont_card_botom = document.querySelectorAll('.card__cont__card__botom')
const card_cont_card_image = document.querySelectorAll('.card__cont__card__image')

const pagination_section = document.querySelector('.page')
const next_page = document.querySelector('#page__rigth')
const page_number = document.querySelector('.page__number')
const prev_page = document.querySelector('#page__left')
const footer_section = document.querySelector('.footer')


// ______________________________ ✅ INPUTS ________________________________
// ✅
const getRandomBeer = () =>{
	url_to_fetch = url + 'random'
	tag_section.style.display = 'none'
	restartPageNumber()
	callAPI()
}
// ✅
const loadGenericGallery = () =>{
	url_to_fetch = url
	_sort_by = 'default'
	_show_as = 'show_grid'
	tag_section.style.display = 'none'
	restartPageNumber()
	closeFilters()
	callAPI()
}
// ✅
const openFilters = () => {
	filter_section.style.display = 'block'
	header_section.style.display = 'none'
	hero_section.style.display = 'none'
	tag_section.style.display = 'none'
	random_section.style.display = 'none'
	pagination_section.style.display = 'none'
	card_section.style.display = 'none'
	footer_section.style.display = 'none'
}
// ✅
const closeFilters = () => {
	filter_section.style.display = 'none'
	header_section.style.display = 'flex'
	hero_section.style.display = 'block'
	random_section.style.display = 'block'
	card_section.style.display = 'block'
	pagination_section.style.display = 'flex'
	footer_section.style.display = 'flex'
}
// ✅
const searchFilter = () =>{
	_beer_nm = filter_search.value
	tag_section.style.display = 'block'
	renderSearchedName()
	closeFilters()
	searchUrlToFetch()
}
// ✅
const searchUrlToFetch = () =>{
	url_to_fetch = url + search + `beer_name=${_beer_nm}`
	callAPI(url_to_fetch)
}
// ✅
const submitFilters = () =>{
	_per_pg = Number(input_by_page.value)
	_abv_min = Number(input_abv_min.value)
	_abv_max = Number(input_abv_max.value) ? Number(input_abv_max.value) : 100
	_show_as = input_show_grid.checked ? input_show_grid.id : input_show_list.id
	_sort_by = input_sort.value[0] === 'A' ? 'abv' : (input_sort.value[0] === 'N' ? 'name' : 'default')
	_sort_order = input_sort.value[2] === 'L'
	tag_section.style.display = 'block'
	renderSelectedFilters()
	restartPageNumber()
	closeFilters()
	filterUrlToFetch()
}
// ✅
const filterUrlToFetch = () =>{
	const page_number = `page=${_page_nmb}`
	const per_page = `per_page=${_per_pg}`
	const abv_range = `abv_gt=${_abv_min}&abv_lt=${_abv_max}`
	url_to_fetch = url + search + abv_range + and + per_page + and + page_number
	callAPI(url_to_fetch)
}
// ✅
const stickyHeader = () =>{
	header_section.classList.toggle('.header_sticky', window.scrollY > 30);
}

// ______________________________ ✅ FETCH ________________________________
// ✅
const callAPI = async () => {	
	try {
		const response = await fetch(url_to_fetch)
		if(response.ok){
			const jsonRes = await response.json()
			sortResults(jsonRes)
		}
	} catch (error) {
		console.log(error)
	}
}
// ✅
const sortResults = (jsonRes) =>{
	const sortResultBy = (by,asc) => {
			if( by === 'default'){
			return jsonRes

		} if (by === 'name' && asc === true){
			return jsonRes.sort((a,b) => a[by] > b[by] ? 1 : -1 )

		} if (by === 'name' && asc === false){
			return jsonRes.sort((a,b) => a[by] > b[by] ? -1 : 1 )

		} if (by === 'abv' && asc === true){
			return jsonRes.sort((a,b) => a[by] - b[by])

		} if (by === 'abv' && asc === false) {
			return jsonRes.sort((a,b) => b[by] - a[by])
		}
	}
	sortResultBy(_sort_by, _sort_order)
	renderGallery(jsonRes)
	renderMatchedResults(jsonRes)
}

// ______________________________ ✅ RENDER ________________________________
// ✅
const renderGallery = async (jsonRes) =>{
	let beer_card = ''
	const image_fail = 'https://bit.ly/3zf0ZlK';
	const show_validate = _show_as === 'show_grid'
	if (jsonRes.length < 1){
		const error_state =`<div class="card_cont_card_error"> No luck this time </div>`
		card_cont.innerHTML = error_state
	} else {
		jsonRes.forEach(e =>{
			beer_card += `
			<div class="${show_validate ? 'card__cont__card' : 'card__cont__card-list'}">
				<a href="card.html?id=${e.id}" class="${show_validate ?'card__cont__card__id' : 'card__cont__card-list__id'}">

				<div class="${show_validate ? 'card__cont__card__image' : 'card__cont__card-list__image'}">
					<img src="${e.image_url ? e.image_url : image_fail}" alt="">
				</div>

				<div class="${show_validate ? 'card__cont__card__botom' : 'card__cont__card-list__botom'}">
					<div class="card_cont_card__bottom_cont">
						<div class="${show_validate ? 'card__cont__card__title' : 'card__cont__card-list__title'}">${e.name}</div>
						<div class="${show_validate ? 'card__cont__card__ABV' : 'card__cont__card-list__ABV'}"> ABV: ${e.abv}%</div>
					</div>
				</div>

				</a>
			</div>`
		})
		card_cont.innerHTML = beer_card
	}
	switchPageVisualization(jsonRes)
}
// ✅
const renderMatchedResults = async (jsonRes) => {
	const shell_hero = `${jsonRes.length} matched types of 🍺 to learn about `
	main_title.innerHTML = shell_hero
}
// ✅
const renderSearchedName = () =>{
	const applied_search = `
		<div class="tag__cont_tag">${_beer_nm}</div>`
	tag_container.innerHTML = applied_search
}
// ✅
const renderSelectedFilters = () =>{
	const _view = _show_as === 'show_grid' ? 'grid' : 'list'
	const _order = _sort_order === true ? 'asc' : 'des'
	const _by = _sort_by === 'default' ? 'default' : `${_sort_by}/${_order}`
	const applied_filters = `
		<div class="tag__cont_tag">see ${_per_pg}</div>
		<div class="tag__cont_tag">${_abv_min}% -${_abv_max}%</div>
		<div class="tag__cont_tag">see as ${_view}</div>
		<div class="tag__cont_tag">${_by}</div>`
	tag_container.innerHTML = applied_filters
}
// ✅
const switchPageVisualization = (jsonRes) => {
	_page_nmb === 1 ? prev_page.disabled = true : prev_page.disabled = false
	jsonRes.length < _per_pg ? next_page.disabled = true : next_page.disabled = false
}
// ✅
const prevPage = () =>{
	_page_nmb--
	page_number.innerHTML = _page_nmb
	filterUrlToFetch()
}
// ✅
const nextPage = () =>{
	_page_nmb++
	page_number.innerHTML = _page_nmb
	filterUrlToFetch()
}
// ✅
const restartPageNumber = () =>{
	_page_nmb = 1
	page_number.innerHTML = _page_nmb
}

//
window.addEventListener('scroll', stickyHeader);
button_search.addEventListener('click', searchFilter) 
filter_open.addEventListener('click', openFilters)
filter_close.addEventListener('click', closeFilters)
clear_tag.addEventListener('click', loadGenericGallery)
button_clear.addEventListener('click', loadGenericGallery)
button_apply.addEventListener('click', submitFilters)
button_random.addEventListener('click', getRandomBeer)
prev_page.addEventListener('click', prevPage)
next_page.addEventListener('click', nextPage)
loadGenericGallery()