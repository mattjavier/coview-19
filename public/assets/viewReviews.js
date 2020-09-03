$(document).ready(function () {
  $.ajax('/api/businesses')
    .then(businesses => {
      businesses = businesses.map(business => business.name)

      $('#businessName').autocomplete({
        source: businesses
      })
    })
})

document.getElementById('srcBusiness').addEventListener('click', event => {
  event.preventDefault()

  let name = document.getElementById('businessName').value

  let type = document.getElementById('typeSrc').options[document.getElementById('typeSrc').selectedIndex].value

  let city = document.getElementById('citySrc').value

  let state = document.getElementById('stateSrc').options[document.getElementById('stateSrc').selectedIndex].value

  console.log(name, type, city, state)
  let search = ''

  if (name !== '') {
    search = '/' + name
    console.log(search)
  }

  if (type !== '') {
    search = search + '/' + type
    console.log(search)
  }

  if (city !== '') {
    search = search + '/' + city
    console.log(search)
  }

  if (state !== '') {
    search = search + '/' + state
    console.log(search)
  }

  // generic search handler
  axios.get('api/businesses' + search)
    .then(({ data }) => {
      console.log(data)
      data.forEach(business => {
        let businessElem = document.createElement('div')
        businessElem.innerHTML = `
        <div id="${business.id}" class="card business">
      <h5 class="card-header row">
        <div class="businessHead col-12 col-sm-6">
          ${business.name} (${business.city}, ${business.state})
        </div>
        <div class="businessHead text-right col-12 col-sm-6">Overall:
          <span class="stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i
              class="fas fa-star-half-alt"></i><i class="far fa-star"></i></span>
        </div>
      </h5>
      <div class="card-body">
        <div class="row">
          <div class="col-6">
            <h5 class="card-title">${business.type}</h5>
          </div>
          <div class="col-6 text-right">
            <p class="card-title">Reviews: ${business.ratings.length}</p>
          </div>
        </div>
        <p class="card-text">
        <div class="row">

          <div class="col-12 col-sm-4">
            Mask Wearing: <span class="stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i
                class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i></span>
          </div>
          <div class="col-12 col-sm-4">
            Social Distancing: <span class="stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i
                class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i></span>
          </div>
          <div class="col-12 col-sm-4">
            Sanitation: <span class="stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i
                class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i></span>
          </div>
        </div>
        </p>
      </div>
      </div>
        `
        document.getElementById('searchResults').prepend(businessElem)
      })
    })
    .catch(err => console.error(err))

})

// include jquery cdn and css