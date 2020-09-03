
// populate business types dropdown
axios.get('api/business-types')
  .then(({ data }) => {
    data.forEach(type => {
      let optionElem = document.createElement('option')
      optionElem.value = type.type
      optionElem.textContent = type.type
      document.getElementById('businessType').append(optionElem)
    })
  })

const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']

// populate states dropdown
states.forEach(state => {
  let optionElem = document.createElement('option')
  optionElem.value = state
  optionElem.textContent = state
  document.getElementById('state').append(optionElem)
})

$(document).ready(function() {

  // businessName autocompleter 
  axios.get('/api/businesses')
    .then(({ data }) => {
      data = data.map(business => business.name)
      autojQuery('#businessName').autocomplete({
        source: data 
      })
    })
    .catch(err => console.log(err))

  // city autocompleter
  axios.get('/api/business-locations')
    .then(({ data }) => {
      data = data.map(location => location.city)
      autojQuery('#city').autocomplete({
        source: data
      })
    })
    .catch(err => console.log(err))
  
  // star ratings
  rateYojQuery("#mask").rateYo({
    rating: 1.5,
    halfStar: true
  })

  rateYojQuery("#social").rateYo({
    rating: 1.5,
    halfStar: true
  })

  rateYojQuery("#sanitation").rateYo({
    rating: 1.5,
    halfStar: true
  })

  rateYojQuery("#overall").rateYo({
    rating: 1.5,
    halfStar: true
  })

  // reset
  document.getElementById('resetReview').addEventListener('click', () => {
    document.getElementById('username').value = ''
    document.getElementById('businessName').value = ''
    document.getElementById('city').value = ''
    document.getElementById('businessType').selectedIndex = 0
    document.getElementById('state').selectedIndex = 0
    document.getElementById('comments').value = ''
    
    rateYojQuery("#mask").rateYo({
      rating: 1.5,
      halfStar: true
    })
  
    rateYojQuery("#social").rateYo({
      rating: 1.5,
      halfStar: true
    })
  
    rateYojQuery("#sanitation").rateYo({
      rating: 1.5,
      halfStar: true
    })
  
    rateYojQuery("#overall").rateYo({
      rating: 1.5,
      halfStar: true
    })
  })

  // submit button
  $('#submit').click(function(event) {
    event.preventDefault()
    let maskRating = rateYojQuery('#mask').rateYo().rateYo('rating')
    let socialDistanceRating = rateYojQuery('#social').rateYo().rateYo('rating')
    let sanitationRating = rateYojQuery('#sanitation').rateYo().rateYo('rating')
    let overallRating = rateYojQuery('#overall').rateYo().rateYo('rating')

    let username = document.getElementById('username').value
    let name = document.getElementById('businessName').value
    let type = document.getElementById('businessType').options[document.getElementById('businessType').selectedIndex].value
    let city = document.getElementById('city').value
    let state = document.getElementById('state').options[document.getElementById('state').selectedIndex].value
    let comment = document.getElementById('comments').value
    axios.get(`/api/businesses/${name}/${type}/${city}/${state}`)
      .then(({ data }) => {
        if (data.length > 0) {
          let businessId = data[0].id
          axios.post('/api/ratings', { 
            name: name, 
            type: type, 
            username: username,
            overallRating: overallRating, 
            maskRating: maskRating, 
            sanitationRating: sanitationRating, 
            socialDistanceRating: socialDistanceRating, 
            comment: comment, 
            businessId: businessId 
          })
            .then(({ data }) => {
              console.log(data)
              document.getElementById('reviewModalLabel').textContent = `Your review for ${data.business.name}`

              document.getElementById('review').innerHTML = `
                <div class="card-deck text-secondary">
                  <div class="card">
                    <div class="card-header">
                      ${data.username}
                    </div>
                    <div class="card-body">
                      <h5 class="card-title">Overall: ${data.overallRating}</h5>
                      <hr>
                      <p class="card-text">
                        Mask Wearing: ${data.maskRating}
                      </p>
                      <p class="card-text">
                        Sanitation Rating: ${data.sanitationRating}
                      </p>
                      <p class="card-text">
                        Social Distancing Rating: ${data.socialDistanceRating}
                      </p>
                      <hr>
                      <p class="card-text">
                        ${data.comment}
                      </p>
                    </div>
                  </div>
                </div>
              `
              // popup modal, when closed clears form, shows review
            })
            .catch(err => console.log(err))
        } else {
          // create business, then create review
          axios.post('/api/businesses', {
            name: name,
            type: type,
            city: city,
            state: state
          })
            .then(({ data }) => {
              axios.post('/api/ratings', {
                name: name,
                type: type,
                username: username,
                overallRating: overallRating,
                maskRating: maskRating,
                sanitationRating: sanitationRating,
                socialDistanceRating: socialDistanceRating,
                comment: comment,
                businessId: data.id
              })
                .then(({ data }) => {
                  console.log(data)
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
  })
})

