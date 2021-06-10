console.log('> ...')



// ❌
// Blank state	(catch_error)
// Error image (api_image_url_error)
// Random URL


// ✅ VARIABLES DE LA API
// API
const url = 'https://api.punkapi.com/v2/beers/'
const search = '?'
const and = '&'
// Variables
let _page_nmb = 1
let _per_pg = 5
let _abv_min = 0 // ___ 0.5
let _abv_max = 60 // ___ 55
// to fetch
let url_to_fetch = url


// ✅ SELECTOR
// Input
const input_by_page = document.querySelector('#page')
const input_abv_min = document.querySelector('#avb-min')
const input_abv_max = document.querySelector('#avb-max')
const button_clear = document.querySelector('#btn_clear')
const button_apply = document.querySelector('#btn_apply')
// Render
const main_title = document.querySelector('.main__title')
const card_cont = document.querySelector('.card__cont')
const card_cont_card = document.querySelectorAll('.card__cont__card')


// ✅ FILTERS APPLY
const submitFilters = () =>{
	console.log('Fx. submitFilters')
	// Filtros
	_per_pg = Number(input_by_page.value)
	_abv_min = Number(input_abv_min.value)
	_abv_max = Number(input_abv_max.value)

	deleteRenderedGallery()
	urlToFetch()
}


// ✅ FILTERS CLEAR
const clearFilters = () =>{
	console.log('Fx. clearFilters')
}



const urlToFetch = () =>{
	const page_number = `page=${_page_nmb}`
	const per_page = `per_page=${_per_pg}`
	const abv_range = `abv_gt=${_abv_min}&abv_lt=${_abv_max}`

	// url
	url_to_fetch = url + search + abv_range + and + per_page
	// const url_to_fetch = url + 'random'
	// const url_to_fetch = url + search + abv_range + and + per_page

	callBeerAPI(url_to_fetch)
}


// add filters
// delete filters
// reset filters

// ✅ API ENDPOINTS to fnction








// ✅
const callBeerAPI = async () => {	
	console.log('Fx. callBeerAPI')
	try {
		const response = await fetch(url_to_fetch)
		if(response.ok){
			const jsonRes = await response.json()
			renderGallery(jsonRes)
			renderMatchedResults(jsonRes)
			console.log(jsonRes)
		}
	} catch (error) {
			console.log(error)
			// ❌
			const shell_card = document.createElement('div')
			shell_card.className = 'card__cont__card'
			shell_card.innerHTML =`<div class="card_cont_card_error"> ❌ </div>`
			card_cont.appendChild(shell_card)
	}
}


// ✅
const renderMatchedResults = async (jsonRes) => {
	console.log('Fx. renderMatchedResults')
	const results = jsonRes.length
	const shell_hero = `${results} matched types of 🍺 to learn about `
	main_title.innerHTML = shell_hero
}


// ✅
const renderGallery = async (jsonRes) =>{
	console.log('Fx. renderGallery')
	for (i in jsonRes){
		const api_name = jsonRes[i].name
		const api_abv = jsonRes[i].abv
		const api_image_url = jsonRes[i].image_url
		const api_image_url_error = 'https://cdn.pixabay.com/photo/2014/12/22/00/04/bottle-576717_960_720.png';
		const api_id = jsonRes[i].id

		const shell_card = document.createElement('div')
		shell_card.className = 'card__cont__card'
		shell_card.innerHTML =`
			<a href="card.html?id=${api_id}" class="card__cont__card__id">
				<div class="card__cont__card__title">${api_name}</div>
				<div class="card__cont__card__ABV"> ABV: ${api_abv}%</div>
				<div class="card__cont__card__botom"></div>
				<div class="card__cont__card__image">
					<img src="${api_image_url ? api_image_url : api_image_url_error}" alt="">
				</div>
			</a>`
		card_cont.appendChild(shell_card)
	}
}




// ❌
const deleteRenderedGallery = () =>{
	console.log('fx. deleteRenderedGallery')
	console.log(card_cont)
	console.log(card_cont_card)
	// card.remove()
}






// ❌
const pagination = async () =>{
	console.log('Fx. pagination')
	// paginacion = array.length / result_page
}





// ❌
const openCloseAsideFilter = () =>{
	console.log('Fx. openCloseAsideFilter')
}




// ✅ CALL
button_clear.addEventListener('click', clearFilters)
button_apply.addEventListener('click', submitFilters)
urlToFetch()






















/*

0) FILTERS 🔥

OPEN -CLOSE ASIDE BAR
	?

FILTERS
	Form receive data



1) CARDSSSS 🔥


EXECUTE SEARCH
	submit(onclick) -> obtiene valores de los formularios

API ENDPOINTS
	const input = input.value -> almacena las respuestas en las var de rango
	const url_to_fetch = url + input

RENDER FILTER TAGS
	const tag_value = input.value
	genera un badge con los parámetros recibidos



CALL API
	Ejecuta la llamada con url_to_fetch


RENDER CALL -> Error
	INVALID-CARD-SHELL


RENDER CALL -> Success Cards
	Pasa parámetros obtenidos a la fx CARD-SHELL
	For (i of list)
	append.CARD-SHELL

CARD-SHELL
	Genera cada card con los parámetros recibidos
	Genera ID al hacer clic que se escuchará OnClick


2) OOOOOOOPEN CARD 🔥

EXECUTE CLICK
	card(onclock) -> obtiene ID

API ENDPOINT
	const input_id = card_ID
	const api_to_fetch = url + input_id

CALL API
	Es necesario hacer un ASYNC?

RENDER DETAIL-SHELL
	Pasa parámetros a la funcion DETAIL-SHELL
	append.DETAIL-SHELL

CALL MAP API

RENDER MAP API

ADD RANDOM POINTS 


*/


// CALL 
