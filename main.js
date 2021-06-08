console.log('> ...')


// ------------------------------ URL 🔥🔥🔥

// get api
const url = 'https://api.punkapi.com/v2/beers/'
const search = '?'
const and = '&'

// random
const _random = 'random' // ____ 325

// page
let _page_nmb = 2
let _per_pg = 10
const page_number = `page=${_page_nmb}`
const per_page = `per_page=${_per_pg}`

// filters
let _abv_desde = 0 // ___ 0.5
let _abv_hasta = 4.5 // ___ 55
const abv_range = `abv_gt=${_abv_desde}&abv_lt=${_abv_hasta}`
//
let _ibu_desde = 200 // ____ 7
let _ibu_hasta = 260 // ____ 200
const ibu_range = `ibu_gt=${_ibu_desde}&ibu_lt=${_ibu_hasta}`
//
let _ebc_desde = 50 // ____ 2
let _ebc_hasta = 55 // ____ 600
const ebc_range = `ebc_gt=${_ebc_desde}&ebc_lt=${_ebc_hasta}`
//
let _brewed_desde = '10-2010' // afterest___05-2016 - automático
let _brewed_hasta = '12-2010' // beforest___05-2007 - automático
const brewed_range = `brewed_before=${_brewed_hasta}&brewed_after=${_brewed_desde}`

// search
let _beer_nm = 'punk_ipa' // add underscore to search to work
const beer_name = `beer_name=${_beer_nm}`
//
let _ing_hops = 'Chinook'
const hops = `hops=${_ing_hops}`
//
let _ing_malt = 'Propino Pale Malt for kettle souring'
const malt = `malt=${_ing_malt}`
//
let _ing_yeast = 'Wyeast 1056 - American Ale'
const yeast = `yeast=${_ing_yeast}`
//
let _ing_food = 'Warm blackberry pie'
const food = `food=${_ing_food}`

// TEST 🔥🔥🔥
const url_to_fetch = url + _random
// const url_to_fetch = url + search + abv_range + and + per_page
// const url_to_fetch = url + search + beer_name + and + per_page


// ------------------------------ GET INPUT 🔥🔥🔥
// Random ->
// filter -> selector
// search -> input
// Show -> per_page, page_number
// sort by -> a,b or b,a
// paginacion 
// send as values for HTML

// RENDER INPUT
// add filters
// delete filters
// reset filters


// ------------------------------ CALL API 🔥🔥🔥
const beerApi = async () => {	
	try {
		const response = await fetch(url_to_fetch)
		if(response.ok){
			const jsonRes = await response.json()
			console.log('> Fx. BeerApi')
			console.log(jsonRes)
			return renderCard(jsonRes)
		}
	} catch (error) {
		console.log(error)
	}
}
beerApi()


// ------------------------------ RENDER CARD 🔥🔥🔥
const renderCard = async (jsonRes) =>{

	console.log('> Fx. RenderCard')
	for (i in jsonRes){
		const api_name = jsonRes[i].name
		// const api_tagline = jsonRes[i].tagline
		// const api_image_url = jsonRes[i].image_url
		// const api_abv = jsonRes[i].abv
		// const api_ibu = jsonRes[i].ibu
		// const api_ebc = jsonRes[i].ebc
		// const api_description = jsonRes[i].description
		// const api_food_pairing = jsonRes[i].food_pairing[i]
		// const api_ingredients = jsonRes[i].ingredients
		// const api_first_brewed = jsonRes[i].first_brewed

		console.log(api_name)
	}

	return renderPage(jsonRes)
}

// BLANK STATE


// ------------------------------ RENDER PAGE DESCRIPTION 🔥🔥🔥
const renderPage = async (jsonRes) =>{
	console.log('> Fx. RenderPage')
	// console.log(jsonRes[0])
}

// 404


// TRIGGER CALL MAP

// CALL MAP API

// RENDER MAP
