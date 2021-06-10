console.log('> ...')

// ❌
// Blank state	(catch_error)
// Error image (api_image_url_error)
// DRY variables URL
// Variables globales
// Show total amount of matches (not per page)

// ______________________________ ✅ VARIABLES DE LA API ___________________

// API
const url = 'https://api.punkapi.com/v2/beers/'
const search = '?'
const and = '&'
//
let _page_nmb = 1
let _per_pg = 25
let _abv_min = 0 // ___ 0.5
let _abv_max = 100 // ___ 55
//
let url_to_fetch = url

// SELECTOR
const input_by_page = document.querySelector('#page')
const input_abv_min = document.querySelector('#avb-min')
const input_abv_max = document.querySelector('#avb-max')
const button_clear = document.querySelector('#btn_clear')
const button_apply = document.querySelector('#btn_apply')
const button_random = document.querySelector('#btn_random')
const pagination = document.querySelector('.page')
const next_page = document.querySelector('#page__rigth')
const page_number = document.querySelector('.page__number')
const prev_page = document.querySelector('#page__left')
const cleat_tag = document.querySelector('.tag__cont')

//
const main_title = document.querySelector('.main__title')
const card_cont = document.querySelector('.card__cont')
const card_cont_card = document.querySelectorAll('.card__cont__card')


// ______________________________ ✅ INPUTS ________________________________

// 🎛
const getRandomBeer = () =>{
	url_to_fetch = url + 'random'
	restartPageNumber()
	hidePagination()
	callAPI()
}
// 🎛
const loadgenericGallery = () =>{
	url_to_fetch = url 
	restartPageNumber()
	showPagination()
	callAPI()
}

// 
// ❌ Hide aside
const openFilters = () =>{
	console.log('Fx. openFilters')
}

// 
// ❌ render filters

// ❌
const textSearch = () =>{
}

// ❌ 
const submitFilters = () =>{
	_per_pg = Number(input_by_page.value)
	_abv_min = Number(input_abv_min.value)
	_abv_max = Number(input_abv_max.value) ? Number(input_abv_max.value) : 100
	restartPageNumber()
	showPagination()
	urlToFetch()
}

// ❌
const urlToFetch = () =>{
	const page_number = `page=${_page_nmb}`
	const per_page = `per_page=${_per_pg}`
	const abv_range = `abv_gt=${_abv_min}&abv_lt=${_abv_max}`
	url_to_fetch = url + search + abv_range + and + per_page + and + page_number
	callAPI(url_to_fetch)
}


// ______________________________ ✅ FETCH ________________________________

// ❌
const callAPI = async () => {	
	try {
		const response = await fetch(url_to_fetch)
		if(response.ok){
			const jsonRes = await response.json()
			renderGallery(jsonRes)
			renderMatchedResults(jsonRes)
		}
	} catch (error) {
			console.log(error)
			const shell_card = document.createElement('div')
			shell_card.className = 'card__cont__card'
			shell_card.innerHTML =`<div class="card_cont_card_error"> ❌ </div>`
			card_cont.appendChild(shell_card)
	}
}

// ______________________________ ✅ RENDER ________________________________

// ✅
const renderGallery = async (jsonRes) =>{
	let beer_card = ''
	const image_fail = 'https://bit.ly/3zf0ZlK';
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
const renderMatchedResults = async (jsonRes) => {
	const results = jsonRes.length
	const shell_hero = `${results} matched types of 🍺 to learn about `
	main_title.innerHTML = shell_hero
}

// 🎛
const hidePagination = () =>{
	pagination.style.display = 'none'
}
const showPagination = () =>{
	pagination.style.display = 'block'
}
const prevPage = () =>{
	if(_page_nmb > 1){
		_page_nmb--
		page_number.innerHTML = _page_nmb
		next_page.disabled = false
	} else {
		prev_page.disabled = true
	}
	urlToFetch()
}
const nextPage = () =>{
	const divided = 325 / _per_pg
	const validate = Number.isInteger(divided)
	if (validate && _page_nmb === divided - 1){
		next_page.disabled = true
	} if ((!validate && _page_nmb >= divided)){
		next_page.disabled = true
	} else {
		_page_nmb++
		page_number.innerHTML = _page_nmb
		prev_page.disabled = false
	}
	urlToFetch()
}
const restartPageNumber = () =>{
	_page_nmb = 1
	page_number.innerHTML = _page_nmb
}

// 
button_clear.addEventListener('click', loadgenericGallery)
button_apply.addEventListener('click', submitFilters)
button_random.addEventListener('click', getRandomBeer)
loadgenericGallery()
prev_page.addEventListener('click', prevPage)
next_page.addEventListener('click', nextPage)