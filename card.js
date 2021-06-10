// ✅ Render card by URL ID
console.log('> ')

// ✅ API
const url = 'https://api.punkapi.com/v2/beers/'
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const url_param = urlParams.get('id') || 'random'
const url_to_fetch = url + url_param

// ✅ Render beer
const detail = document.querySelector('.detail')
const renderSelectedBeer = async () => {
	try {
		const response = await fetch(url_to_fetch)
		if (response.ok) {
			const jsonRes = await response.json()

			const api_name = jsonRes[0].name
			const api_tagline = jsonRes[0].tagline
			const api_image_url = jsonRes[0].image_url
			const api_image_url_error = 'https://cdn.pixabay.com/photo/2014/12/22/00/04/bottle-576717_960_720.png';
			const api_abv = jsonRes[0].abv
			// const api_ibu = jsonRes[0].ibu
			// const api_ebc = jsonRes[0].ebc
			const api_description = jsonRes[0].description
			const api_food_pairing = jsonRes[0].food_pairing[0]
			// const api_ingredients = jsonRes[0].ingredients[0]
			const api_first_brewed = jsonRes[0].first_brewed
			
			const shell_detail = document.createElement('div')
			shell_detail.className = 'card__cont__card'
			shell_detail.innerHTML =`
				<section class="detail__hero">
					<div class="detail__hero__name">${api_name}</div>
					<div class="detail__hero__tagline">${api_tagline}</div>
					<div class="detail__hero__brew">First brewed: ${api_first_brewed}</div>
					<div class="detail__hero__abv">ABV: ${api_abv}%</div>
					<div class="detail__hero__image">
						<img src="${api_image_url ? api_image_url : api_image_url_error}" alt="${api_name}"></div>
				</section>
				<section class="detail_info">
					<div class="detail_info__description">${api_description}</div>
				</section>
				<section class="detail__ingredients"> 'INGREDIENTS PENDING' </section>
				<section class="detail__map">
					<div class="detail__map__title"> Find yours 📍 here </div>
					<div class="detail__map__api"> IMG </div>
					<div class="detail__map__food">
						<div class="detail__map__food__title">And don’t forget to pair with:</div>
						<div class="detail__map__food__desc">🥘 ${api_food_pairing}</div>
					</div>
				</section>`
			detail.appendChild(shell_detail)
		}
	} catch (error) {
		console.log(error)
	}
}
renderSelectedBeer()
