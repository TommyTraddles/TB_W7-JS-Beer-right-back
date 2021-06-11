console.log('> ...')

// ______________________________ ✅ VARIABLES DE LA API ___________________

// API
const url = 'https://api.punkapi.com/v2/beers/'
const search = '?'
const and = '&'
// API VAR
let _beer_nm = ''
let _page_nmb = 1
let _per_pg = 25
let _abv_min = 0
let _abv_max = 100 
let url_to_fetch = url
let _show_as = ''
let _sort_by = 'name'
let _sort_order = true

// SELECTOR
const input_by_page = document.querySelector('#page')
const input_abv_min = document.querySelector('#avb-min')
const input_abv_max = document.querySelector('#avb-max')
const button_clear = document.querySelector('#btn_clear')
const button_apply = document.querySelector('#btn_apply')
const button_random = document.querySelector('#btn_random')

const header_section = document.querySelector('.header')
const hero_section = document.querySelector('.hero')
const tag_section = document.querySelector('.tag')
const random_section = document.querySelector('.random')
const card_section = document.querySelector('.card')
const footer_section = document.querySelector('.footer')

const pagination_section = document.querySelector('.page')
const next_page = document.querySelector('#page__rigth')
const page_number = document.querySelector('.page__number')
const prev_page = document.querySelector('#page__left')
const clear_tag = document.querySelector('.tag__clear')

const filter_section = document.querySelector('.filter')
const filter_close = document.querySelector('#filter_close')
const filter_open = document.querySelector('#filter_open')
const filter_search = document.querySelector('#search_string')
const button_search = document.querySelector('#btn_search')
const filter_sort = document.querySelector('#sort')
const filter_show_grid = document.querySelector('#show_grid')
const filter_show_list = document.querySelector('#show_list')
//
const main_title = document.querySelector('.main__title')
const card_cont = document.querySelector('.card__cont')
const card_cont_card = document.querySelectorAll('.card__cont__card')


// ______________________________ ✅ INPUTS ________________________________

// ✅
const getRandomBeer = () =>{
	url_to_fetch = url + 'random'
	restartPageNumber()
	callAPI()
}
// ✅
const loadgenericGallery = () =>{
	url_to_fetch = url 
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
	header_section.style.display = 'block'
	hero_section.style.display = 'block'
	tag_section.style.display = 'block'
	random_section.style.display = 'block'
	pagination_section.style.display = 'block'
	card_section.style.display = 'block'
	footer_section.style.display = 'block'
}
// ✅
const searchFilter = () =>{
	_beer_nm = filter_search.value
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
	console.log('fx. submitFilters')
	_per_pg = Number(input_by_page.value)
	_abv_min = Number(input_abv_min.value)
	_abv_max = Number(input_abv_max.value) ? Number(input_abv_max.value) : 100
	_show_as = filter_show_grid.checked ? filter_show_grid.id : filter_show_list.id
	_sort_by = filter_sort.value[0] === 'A' ? 'abv' : 'name'
	_sort_order = filter_sort.value[2] === 'L'
	changeGalleryView()
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

// ❌ Crear estilos y modificarlos
const changeGalleryView = () =>{
	console.log('fx. changeGalleryView')
	if(_show_as === 'show_grid'){
		console.log('show grid')
	} else {
		console.log('show list')
	}
}

// ❌ render filters in results


// ❌ Sticky header


// ❌ FAVORITOS -- ID, sección única -- 


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
// ❌ Falla sort
const sortResults = (jsonRes) =>{
	console.log('Fx. sortResults')
	console.log(_sort_by)
	console.log(_sort_order)
	// jsonRes.sort((a,b) =>{
	// 	if(_sort_order){
	// 		(a[_sort_by] > b[_sort_by]) ? 1 : ((a[_sort_by] < b[_sort_by]) ? -1 : 0)
	// 	} else {
	// 		(b[_sort_by] > a[_sort_by]) ? 1 : ((b[_sort_by] < a[_sort_by]) ? -1 : 0)
	// 	}
	// })
	renderGallery(jsonRes)
	renderMatchedResults(jsonRes)
}


// ______________________________ ✅ RENDER ________________________________

// ❌ Crear estilo BLANK + imagen de error
const renderGallery = async (jsonRes) =>{
	let beer_card = ''
	const image_fail = 'https://bit.ly/3zf0ZlK';
	if (jsonRes.length < 1){
		const error_state =`<div class="card_cont_card_error"> ❌ </div>`
		card_cont.innerHTML = error_state
	} else {
		jsonRes.forEach(e =>{
			beer_card += `
			<div class="card__cont__card">
				<a href="card.html?id=${e.id}" class="card__cont__card__id">
					<div class="card__cont__card__title">${e.name}</div>
					<div class="card__cont__card__ABV"> ABV: ${e.abv}%</div>
					<div class="card__cont__card__botom"></div>
					<div class="card__cont__card__image">
						<img src="${e.image_url ? e.image_url : image_fail}" alt="">
					</div>
				</a>
			</div>`
		})
		card_cont.innerHTML = beer_card
	}
	switchPageVisualization(jsonRes)
}
// ❌ Show total amount of matches (not per page)
const renderMatchedResults = async (jsonRes) => {
	const shell_hero = `${jsonRes.length} matched types of 🍺 to learn about `
	main_title.innerHTML = shell_hero
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
button_search.addEventListener('click', searchFilter) 
filter_open.addEventListener('click', openFilters)
filter_close.addEventListener('click', closeFilters)
clear_tag.addEventListener('click', loadgenericGallery)
button_clear.addEventListener('click', loadgenericGallery)
button_apply.addEventListener('click', submitFilters)
button_random.addEventListener('click', getRandomBeer)
prev_page.addEventListener('click', prevPage)
next_page.addEventListener('click', nextPage)
loadgenericGallery()