
// business name auto complete
axios.get('/api/businesses')
  .then(({ data }) => {
    data = data.map(business => business.name)

    autojQuery('#businessName').autocomplete({
      source: data
    })
  })


// city autocompleter
axios.get('/api/business-locations')
  .then(({ data }) => {
    data = data.map(location => location.city)
    autojQuery('#citySrc').autocomplete({
      source: data
    })
  })
  .catch(err => console.log(err))

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

// populate business types dropdown
axios.get('api/business-types')
  .then(({ data }) => {
    data.forEach(type => {
      let optionElem = document.createElement('option')
      optionElem.value = type.type
      optionElem.textContent = type.type
      document.getElementById('typeSrc').append(optionElem)
    })
  })

const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']

// populate states dropdown
states.forEach(state => {
  let optionElem = document.createElement('option')
  optionElem.value = state
  optionElem.textContent = state
  document.getElementById('stateSrc').append(optionElem)
})

states.forEach(state => {
  let optionElem = document.createElement('option')
  optionElem.value = state
  optionElem.textContent = state
  document.getElementById('state').append(optionElem)
})

const buildWhere = (name, type, city, state) => {
  let where = {}
  if (name.length > 0) {
    Object.assign(where, { name: name })
  }

  if (type.length > 0) {
    Object.assign(where, { type: type })
  }

  if (city.length > 0) {
    Object.assign(where, { city: city })
  }

  if (state.length > 0) {
    Object.assign(where, { state: state })
  }

  return where
}

document.getElementById('srcBusiness').addEventListener('click', event => {
  event.preventDefault()
  document.getElementById('noResults').classList.add('d-none')
  document.getElementById('searchResults').innerHTML = ''
  document.getElementById('reviewResults').innerHTML = ''

  let name = document.getElementById('businessName').value

  let type = document.getElementById('typeSrc').options[document.getElementById('typeSrc').selectedIndex].value

  let city = document.getElementById('citySrc').value

  let state = document.getElementById('stateSrc').options[document.getElementById('stateSrc').selectedIndex].value

  let businessId = ''

  let where = buildWhere(name, type, city, state)
  console.log(where)

  // generic search handler
  axios.post(`/api/businesses/get`, where)
    .then(({ data }) => {

      console.log(data)
      if (data.length === 0) {
        console.log('empty')
        document.getElementById('noResults').classList.remove('d-none')

      } else {

        data.forEach(business => {
          let businessElem = document.createElement('div')
          businessElem.innerHTML = `
          <div id="businessCard${business.id}" class="rounded-top">
        <div id="${business.id}" class="card business border-0">
      <h5 class="card-header row">
        <div class="businessHead col-12 col-sm-6">
          ${business.name} (${business.city}, ${business.state})
        </div>
        <div class="businessHead d-flex justify-content-end col-12 col-sm-6">Overall:
          <span id="overall${business.id}" class>Stars</span>
        </div>
      </h5>
      <div class="card-body">
        <div class="row">
          <div class="col-6">
            <h5 class="card-title">${business.type}</h5>
          </div>
          <div class="col-6 text-right">
            <p id="${business.id}length" class="card-title">Reviews: ${business.ratings.length}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-sm-4">
            Mask Wearing: <span id="maskCard${business.id}">Stars</span>
          </div>
          <div class="col-12 col-sm-4">
            Social Distancing: <span id="socialCard${business.id}">Stars</span>
          </div>
          <div class="col-12 col-sm-4">
            Sanitation: <span id="sanitationCard${business.id}">Stars</span>
          </div>
        </div>
       
 </div>
<div class="accordion rounded-bottom" id="accordionExample${business.id}">
  <div id="card${business.id}" class="card border-0 rounded-bottom">
    <div class="test card-header rounded-bottom" id="heading${business.id}">
      <div class="mb-0 row">
        <div class="col-6">
                        <!-- write review modal -->
        <div>
          <a id="writeReview${business.id}" type="button" href="" class="btn btn-custom" data-toggle="modal" data-target="#writeReviewModal${business.id}">
            Write Review
          </a>
          <!-- Modal Window -->
          <div class="modal fade" id="writeReviewModal${business.id}" tabindex="-1" role="dialog"
            aria-labelledby="writeReviewModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <!-- modal header -->
                <div class="modal-header bg-danger">
                  <h5 class="modal-title" id="writeReview${business.id}ModalLabel">Write Review for ${business.name}</h5>
                  <a type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </a>
                </div>
                <!-- content of modal -->
                <div class="modal-body">
                  <form>
                    <div class="form-group row">
                      <label for="username" class="col-sm-4 col-form-label">Username:</label>
                      <div class="col-sm-6">
                        <input type="text" class="form-control" id="username" placeholder="e.g. John Doe or user123">
                        <small id="userMessage" class="form-text text-muted">Choose a username that will display with
                          your reivew.</small>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="${business.id}businessName" class="col-sm-4 col-form-label">Business Name:</label>
                      <div class="col-sm-6">
                        <input type="text" class="form-control" id="${business.id}businessName" value="${business.name}">
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="businessType" class="col-sm-4 col-form-label">Business Type:</label>
                      <div class="col-sm-6">
                        <!-- populate this list with some seeded business types. Include an "other" option perhaps? -->
                        <select class="form-control" id="${business.id}businessType">
                          <option value="${business.type}" selected>${business.type}</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <p>Where is this business located?</p>
                      <div class="form-group row">
                        <label for="city" class="col-sm-4 col-form-label">City:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" id="${business.id}city" value="${business.city}">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="state" class="col-sm-4 col-form-label">State:</label>
                        <div class="col-sm-6">
                          <select class="form-control" id="${business.id}state">
                            <option value="${business.state}">${business.state}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p>Rate this business on the degree to which their employees and customers comply with the <a
                          href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/index.html"
                          target="_blank">prevention
                          recommendations</a> outlined by the CDC and other local authorities.</p>
                      <small class="form-text text-muted">(1 star = poor, 5 stars = excellent)</small>
                      <div class="form-group row">
                        <label for="maskModal" class="col-sm-4 col-form-label">Mask use:</label>
                        <div class="col-sm-6">
                          <div id="maskModal${business.id}">Stars</div>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="socialModal" class="col-sm-4 col-form-label">Social Distancing:</label>
                        <div class="col-sm-6">
                          <div id="socialModal${business.id}">Stars</div>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="sanitationModal" class="col-sm-4 col-form-label">Sanitization:</label>
                        <div class="col-sm-6">
                          <div id="sanitationModal${business.id}">Stars</div>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="overallModal" class="col-sm-4 col-form-label">Overall:</label>
                        <div class="col-sm-6">
                          <div id="overallModal${business.id}">Stars</div>
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="comments" class="col-sm-4 col-form-label">Comments:</label>
                      <div class="col-sm-8">
                        <textarea class="form-control" id="${business.id}comments" rows="3"
                          placeholder="Enter comment here."></textarea>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <!-- close button -->
                  <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                  <!-- create log in button -->
                  <a id="${business.id}submit" class="btn btn-custom" href="#" role="button" data-toggle="modal" data-target="#reviewModal" data-dismiss="modal">Submit</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        
        <div class="col-6 d-flex justify-content-end">        
          <a class="btn btn-custom" href="" type="button" data-toggle="collapse" data-target="#collapse${business.id}"
          aria-expanded="true" aria-controls="collapse${business.id}">
          View Reviews
          </a>
        </div>
      </div>
    </div>
    <div id="collapse${business.id}" class="collapse" aria-labelledby="heading${business.id}" data-parent="#accordionExample${business.id}">
      <div id="${business.id}individualReviews" class="card-body card-columns">
        
      </div>
    </div>
  </div>
      </div>
</div>
     
              `
              
              setTimeout(() => {

                axios.get(`/api/ratings/avg-overall/${business.id}`)
                  .then(({ data }) => {
                    let rating
                    if (data[0].overall_rating !== null) {
                      rating = data[0].overall_rating
                    } else {
                      rating = 0
                    }
                    rateYojQuery(`#overall${business.id}`).rateYo({
                      rating: rating,
                      halfStar: true,
                      readOnly: true,
                      starWidth: "20px"
                    })
                  })
                  .catch(err => console.log(err))
                
                axios.get(`/api/ratings/avg-mask/${business.id}`)
                  .then(({ data }) => {
                    let rating
                    if (data[0].mask_rating !== null) {
                      rating = data[0].mask_rating
                    } else {
                      rating = 0
                    }
                    rateYojQuery(`#maskCard${business.id}`).rateYo({
                      rating: rating,
                      halfStar: true,
                      readOnly: true,
                      starWidth: "20px"
                    })
                  })
                  .catch(err => console.log(err))
              
                axios.get(`/api/ratings/avg-social/${business.id}`)
                  .then(({ data }) => {
                    let rating
                    if (data[0].social_rating !== null) {
                      rating = data[0].social_rating
                    } else {
                      rating = 0
                    }
                    rateYojQuery(`#socialCard${business.id}`).rateYo({
                      rating: rating,
                      halfStar: true,
                      readOnly: true,
                      starWidth: "20px"
                    })
                  })
                  .catch(err => console.log(err))
              
                axios.get(`/api/ratings/avg-sanitation/${business.id}`)
                  .then(({ data }) => {
                    let rating
                    if (data[0].sanitation_rating !== null) {
                      rating = data[0].sanitation_rating
                    } else {
                      rating = 0
                    }
                    rateYojQuery(`#sanitationCard${business.id}`).rateYo({
                      rating: rating,
                      halfStar: true,
                      readOnly: true,
                      starWidth: "20px"
                    })
                  })
                  .catch(err => console.log(err))
              
                rateYojQuery(`#overallModal${business.id}`).rateYo({
                  rating: 1.5,
                  halfStar: true,
                  
                  starWidth: "20px"
                })
              
                rateYojQuery(`#maskModal${business.id}`).rateYo({
                  rating: 1.5,
                  halfStar: true,
                
                  starWidth: "20px"
                })
              
                rateYojQuery(`#socialModal${business.id}`).rateYo({
                  rating: 1.5,
                  halfStar: true,
                  
                  starWidth: "20px"
                })
              
                rateYojQuery(`#sanitationModal${business.id}`).rateYo({
                  rating: 1.5,
                  halfStar: true,
                  
                  starWidth: "20px"
                })

                document.getElementById(`${business.id}submit`).addEventListener('click', event => {
                  event.preventDefault()
                  let overallRating = rateYojQuery(`#overallModal${business.id}`).rateYo().rateYo('rating')
                  let maskRating = rateYojQuery(`#maskModal${business.id}`).rateYo().rateYo('rating')
                  let socialRating = rateYojQuery(`#socialModal${business.id}`).rateYo().rateYo('rating')
                  let sanitationRating = rateYojQuery(`#sanitationModal${business.id}`).rateYo().rateYo('rating')
                  axios.post(`/api/ratings`, {
                    name: business.name,
                    type: business.type,
                    username: document.getElementById('username').value,
                    overallRating: overallRating, 
                    maskRating: maskRating, 
                    sanitationRating: sanitationRating, 
                    socialDistanceRating: socialRating, 
                    comment: document.getElementById(`${business.id}comments`).value,
                    businessId: business.id
                  })
                    .then(({ data }) => {
                      console.log('submitted')
                      document.getElementById('reviewModalLabel').textContent = `Your review for ${data.business.name}`
  
                      document.getElementById('review').innerHTML = `
                        <div class="card-deck text-secondary">
                          <div class="card">
                            <div class="card-header">
                              ${data.username}
                            </div>
                            <div class="card-body">
                              <h5 class="card-title">Overall:</h5>
                              <div class="col-sm-4">
                                <div id="overallRev">Stars</div>
                              </div>
                              <hr>
                              <div class="card-text">
                                Mask Wearing: 
                                <div class="col-sm-4">
                                  <div id="maskRev">Stars</div>
                                </div>
                              </div>
                              <div class="card-text">
                                Sanitation Rating:
                                <div class="col-sm-4">
                                  <div id="sanitationRev">Stars</div>
                                </div>
                              </div>
                              <div class="card-text">
                                Social Distancing Rating: 
                                <div class="col-sm-4">
                                  <div id="socialRev">Stars</div>
                                </div>
                              </div>
                              <hr>
                              <div class="card-text">
                                ${data.comment}
                              </div>
                            </div>
                          </div>
                        </div>
                      `
  
                      setTimeout(() => {
                        rateYojQuery("#maskRev").rateYo({
                          rating: data.maskRating,
                          readOnly: true
                        })
                      
                        rateYojQuery("#socialRev").rateYo({
                          rating: data.socialDistanceRating,
                          readOnly: true
                        })
                      
                        rateYojQuery("#sanitationRev").rateYo({
                          rating: data.sanitationRating,
                          readOnly: true
                        })
                      
                        rateYojQuery("#overallRev").rateYo({
                          rating: data.overallRating,
                          readOnly: true
                        })
                      }, 500)

                      let reviewElem = document.createElement('div')
                      reviewElem.innerHTML = `
                  <div class="card userReview">
            <div class="card-header">
              <i class="fas fa-user"></i> ${data.username}
            </div>
            <div class="card-body">
              <h5 class="card-title">Overall: <span id="ostars${data.id}">Stars</span></h5>
              <hr class="border-danger">
              <p class="card-text">Mask Wearing:<br><span id="mstars${data.id}">Stars</span></p>
              <p class="card-text">Social Distancing:<br><span id="sdstars${data.id}">Stars</span></p>
              <p class="card-text">Sanitation:<br> <span id="sstars${data.id}">span></p>
              <hr class="border-danger">
              <p class="card-text">${data.comment}</p>
            </div>
            <div class="card-footer">
              <small class="text-muted">Created on ${moment(data.createdAt.substring(0, 10)).format('MM/DD/YYYY')}.</small>
            </div>
          </div>
                  `
                  document.getElementById('username').value = ''
                  document.getElementById(`${business.id}individualReviews`).innerHTML = ''
                  document.getElementById(`${business.id}individualReviews`).classList.add('card-columns')
                  document.getElementById(`${business.id}individualReviews`).classList.add('bg-dark')
                  setTimeout(() => {
                    rateYojQuery(`#mstars${data.id}`).rateYo({
                      rating: data.maskRating,
                      readOnly: true
                    })
                  
                    rateYojQuery(`#sdstars${data.id}`).rateYo({
                      rating: data.socialDistanceRating,
                      readOnly: true
                    })
                  
                    rateYojQuery(`#sstars${data.id}`).rateYo({
                      rating: data.sanitationRating,
                      readOnly: true
                    })
                  
                    rateYojQuery(`#ostars${data.id}`).rateYo({
                      rating: data.overallRating,
                      readOnly: true
                    })
                  }, 500)
                      document.getElementById(`${business.id}individualReviews`).prepend(reviewElem)
                      
                      axios.get('/api/ratings')
                    })
                    .catch(err => console.log(err))
                })
              
              },500)

          document.getElementById('searchResults').prepend(businessElem)


          axios.get(`api/ratings/${business.id}`)
            .then(({ data }) => {
              console.log(data)
              if (data.length === 0) {
                document.getElementById(`${business.id}individualReviews`).innerText = "No reviews yet for this business."
                document.getElementById(`${business.id}individualReviews`).classList.remove('card-columns')
              } else {
                data.forEach(review => {
                  document.getElementById(`${business.id}individualReviews`).classList.add('bg-dark')
                  let reviewElem = document.createElement('div')
                  reviewElem.innerHTML = `
              <div class="card userReview">
        <div class="card-header">
          <i class="fas fa-user"></i> ${review.username}
        </div>
        <div class="card-body">
          <h5 class="card-title">Overall: <span id="overallStars${review.id}">Stars</span></h5>
          <hr class="border-danger">
          <p class="card-text">Mask Wearing:<br> <span id="maskStars${review.id}">Stars</span></p>
          <p class="card-text">Social Distancing:<br> <span id="socialDistanceStars${review.id}">Stars</span></p>
          <p class="card-text">Sanitation:<br> <span id="sanitationStars${review.id}">span></p>
          <hr class="border-danger">
          <p class="card-text">${review.comment}</p>
        </div>
        <div class="card-footer">
          <small class="text-muted">Created on ${moment(review.createdAt.substring(0, 10)).format('MM/DD/YYYY')}.</small>
        </div>
      </div>
              `

              setTimeout(() => {
                rateYojQuery(`#maskStars${review.id}`).rateYo({
                  rating: review.maskRating,
                  readOnly: true
                })
              
                rateYojQuery(`#socialDistanceStars${review.id}`).rateYo({
                  rating: review.socialDistanceRating,
                  readOnly: true
                })
              
                rateYojQuery(`#sanitationStars${review.id}`).rateYo({
                  rating: review.sanitationRating,
                  readOnly: true
                })
              
                rateYojQuery(`#overallStars${review.id}`).rateYo({
                  rating: review.overallRating,
                  readOnly: true
                })
              }, 500)
                  document.getElementById(`${business.id}individualReviews`).prepend(reviewElem)
                  
                  setTimeout(() => {
                    console.log('getting')
                    axios.get(`/api/ratings/avg-overall/${business.id}`)
                  .then(({ data }) => {
                    let rating
                    if (data[0].overall_rating !== null) {
                      rating = data[0].overall_rating
                    } else {
                      rating = 0
                    }
                    rateYojQuery(`#overall${business.id}`).rateYo({
                      rating: rating,
                      halfStar: true,
                      readOnly: true,
                      starWidth: "20px"
                    })
                  })
                  .catch(err => console.log(err))
                
                axios.get(`/api/ratings/avg-mask/${business.id}`)
                  .then(({ data }) => {
                    let rating
                    if (data[0].mask_rating !== null) {
                      rating = data[0].mask_rating
                    } else {
                      rating = 0
                    }
                    rateYojQuery(`#maskCard${business.id}`).rateYo({
                      rating: rating,
                      halfStar: true,
                      readOnly: true,
                      starWidth: "20px"
                    })
                  })
                  .catch(err => console.log(err))
              
                axios.get(`/api/ratings/avg-social/${business.id}`)
                  .then(({ data }) => {
                    let rating
                    if (data[0].social_rating !== null) {
                      rating = data[0].social_rating
                    } else {
                      rating = 0
                    }
                    rateYojQuery(`#socialCard${business.id}`).rateYo({
                      rating: rating,
                      halfStar: true,
                      readOnly: true,
                      starWidth: "20px"
                    })
                  })
                  .catch(err => console.log(err))
              
                axios.get(`/api/ratings/avg-sanitation/${business.id}`)
                  .then(({ data }) => {
                    let rating
                    if (data[0].sanitation_rating !== null) {
                      rating = data[0].sanitation_rating
                    } else {
                      rating = 0
                    }
                    rateYojQuery(`#sanitationCard${business.id}`).rateYo({
                      rating: rating,
                      halfStar: true,
                      readOnly: true,
                      starWidth: "20px"
                    })
                  })
                  .catch(err => console.log(err))
                  }, 500)
                  
                })
              }
            })
            .catch(err => console.error(err))
        })
      }
    })
    .catch(err => console.error(err))


})

// include jquery cdn and css