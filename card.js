console.log('> ...')

// ❌
// CALL MAP API
// RENDER MAP API
// ADD RANDOM POINTS 


// ______________________________ ✅ VARIABLES DE LA API ___________________
//
const url = 'https://api.punkapi.com/v2/beers/'
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const url_param = urlParams.get('id') || 'random'
const url_to_fetch = url + url_param
// 
const detail = document.querySelector('.detail')

// ______________________________ ✅ FETCH ________________________________

//✅
const callBeerAPI = async () => {
	try {
		const response = await fetch(url_to_fetch)
		if (response.ok) {
			const jsonRes = await response.json()
			renderBeer(jsonRes)
		}
	} catch (error) {
		console.log(error)
	}
}

// ______________________________ ✅ RENDER ________________________________

// ✅
const renderBeer = (jsonRes) =>{
	let selected_beer = ''
	const image_fail = 'https://bit.ly/3zf0ZlK';
	jsonRes.forEach(e =>{
		selected_beer += `
		<section class="detail__hero">
			<div class="detail__hero__texts">
				<div class="detail__hero__name">${e.name}</div>
				<div class="detail__hero__tagline">${e.tagline}</div>
				<div class="taglines__container">
					<div class="detail__hero__brew">First brewed: ${e.first_brewed}</div>
					<div class="detail__hero__abv">ABV: ${e.abv}%</div>
				</div>
			</div>
			<div class="detail__hero__image">
				<img src="${e.image_url ? e.image_url : image_fail}" alt="${e.name}"></div>
		</section>
		<section class="detail_info">
			<div class="detail_info__description">${e.description}</div>
		</section>
		<section class="detail__ingredients"> 'INGREDIENTS PENDING' </section>
		<section class="detail__map">
			<div class="detail__map__title"> Find yours 📍 here </div>
			<div class="detail__map__api"> ❌ Call not integrated due time </div>
			<div class="detail__map__food">
				<div class="detail__map__food__title">And don’t forget to pair with:</div>
				<div class="detail__map__food__desc">🥘 ${e.food_pairing[0]}</div>
			</div>
		</section>`
	})
detail.innerHTML = selected_beer
}

callBeerAPI()
