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

      } else if (data.length === 1) {
        data.forEach(business => {
          businessId = `${business.id}`
          let businessElem = document.createElement('div')
          businessElem.innerHTML = `
            <div id="${business.id}" class="card business">
              <h5 class="card-header row">
                <div class="businessHead col-12 col-sm-6">
                  ${business.name} (${business.city}, ${business.state})
                </div>
                <div class="businessHead text-right col-12 col-sm-6">Overall:
                  <span id="overall">Stars</span>
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
                      Mask Wearing: <span id="maskw">Stars</span>
                    </div>
                    <div class="col-12 col-sm-4">
                      Social Distancing: <span id="sociald">Stars</span>
                    </div>
                    <div class="col-12 col-sm-4">
                      Sanitation: <span id="sanitationr">Stars</span>
                    </div>
                  </div>
                </p>
                <!-- write review modal -->
                <div>
                  <button id="writeReview${business.id}" type="button" class="btn btn-custom" data-toggle="modal" data-target="#writeReviewModal${business.id}">
                  Write Review
                  </button>

                  <!-- Modal Window -->
                  <div class="modal fade" id="writeReviewModal${business.id}" tabindex="-1" role="dialog"
                    aria-labelledby="writeReviewModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">

                        <!-- modal header -->
                        <div class="modal-header bg-danger">
                          <h5 class="modal-title" id="writeReview${business.id}ModalLabel">Write Review for ${business.name}</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <!-- content of modal -->
                        <div class="modal-body">
                          <form>

                            <div class="form-group row">
                              <label for="username" class="col-sm-4 col-form-label">Username:</label>
                              <div class="col-sm-6">
                                <input type="text" class="form-control" id="username" placeholder="e.g. John Doe or user123">
                                <small id="userMessage" class="form-text text-muted">Choose a username that will display with your reivew.</small>
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
                              <p>Rate this business on the degree to which their employees and customers comply with the <a href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/index.html" target="_blank">prevention recommendations</a> outlined by the CDC and other local authorities.</p>
                              <small class="form-text text-muted">(1 star = poor, 5 stars = excellent)</small>

                              <div class="form-group row">
                                <label for="maskUse" class="col-sm-4 col-form-label">Mask use:</label>
                                <div class="col-sm-6">
                                  <span id="maskModal">Stars</span>
                                </div>
                              </div>

                              <div class="form-group row">
                                <label for="socialDistancing" class="col-sm-4 col-form-label">Social Distancing:</label>
                                <div class="col-sm-6">
                                  <span id="socialModal">Stars</span>
                                </div>
                              </div>

                              <div class="form-group row">
                                <label for="sanitization" class="col-sm-4 col-form-label">Sanitization:</label>
                                <div class="col-sm-6">
                                  <span id="sanitationModal">Stars</span>
                                </div>
                              </div>

                              <div class="form-group row">
                                <label for="maskUse" class="col-sm-4 col-form-label">Overall:</label>
                                <div class="col-sm-6">
                                  <span id="overallModal">Stars</span>
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
                          <a id="${business.id}submit" class="btn btn-custom" href="#" role="button">Submit</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `

          setTimeout(() => {
            axios.get(`/api/ratings/avg-overall/${business.id}`)
              .then(({ data }) => {
                rateYojQuery("#overall").rateYo({
                  rating: data[0].overall_rating,
                  halfStar: true,
                  readOnly: true,
                  starWidth: "20px"
                })
              })
              .catch(err => console.log(err))
            
            axios.get(`/api/ratings/avg-mask/${business.id}`)
              .then(({ data }) => {
                rateYojQuery("#maskw").rateYo({
                  rating: data[0].mask_rating,
                  halfStar: true,
                  readOnly: true,
                  starWidth: "20px"
                })
              })
              .catch(err => console.log(err))
          
            axios.get(`/api/ratings/avg-social/${business.id}`)
              .then(({ data }) => {
                rateYojQuery("#sociald").rateYo({
                  rating: data[0].social_rating,
                  halfStar: true,
                  readOnly: true,
                  starWidth: "20px"
                })
              })
              .catch(err => console.log(err))
          
            axios.get(`/api/ratings/avg-sanitation/${business.id}`)
              .then(({ data }) => {
                rateYojQuery("#sanitationr").rateYo({
                  rating: data[0].sanitation_rating,
                  halfStar: true,
                  readOnly: true,
                  starWidth: "20px"
                })
              })
              .catch(err => console.log(err))
          
            rateYojQuery("#overallModal").rateYo({
              rating: 1.5,
              halfStar: true,
              
              starWidth: "20px"
            })
          
            rateYojQuery("#maskModal").rateYo({
              rating: 1.5,
              halfStar: true,
            
              starWidth: "20px"
            })
          
            rateYojQuery("#socialModal").rateYo({
              rating: 1.5,
              halfStar: true,
              
              starWidth: "20px"
            })
          
            rateYojQuery("#sanitationModal").rateYo({
              rating: 1.5,
              halfStar: true,
              
              starWidth: "20px"
            })
          
          },500)

          document.getElementById('searchResults').prepend(businessElem)
        })

        axios.get(`api/ratings/${businessId}`)
          .then(({ data }) => {
            console.log(data)
            data.forEach(review => {
              let reviewElem = document.createElement('div')
              reviewElem.innerHTML = `
                <div class="card userReview">
                  <div class="card-header">
                    <i class="fas fa-user"></i> ${review.username}
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">Overall: <span id="overallCard${review.id}">Stars</span></h5>
                    <hr class="border-danger">
                    <p class="card-text">Mask Wearing:<br><span id="maskCard${review.id}">Stars</span</p>
                    <p class="card-text">Social Distancing:<br> <span id="socialCard${review.id}">Stars</span></p>
                    <p class="card-text">Sanitation:<br> <span id="sanitationCard${review.id}">Stars</span></p>
                    <hr class="border-danger">
                    <p class="card-text">${review.comment}</p>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted">Created on ${moment(review.createdAt.substring(0, 10)).format('MM/DD/YYYY')}.</small>
                  </div>
                </div>
              `

              setTimeout(() => {
                rateYojQuery(`#overallCard${review.id}`).rateYo({
                  rating: review.overallRating,
                  halfStar: true,
                  readOnly: true,
                  starWidth: "20px"
                })

                rateYojQuery(`#maskCard${review.id}`).rateYo({
                  rating: review.maskRating,
                  halfStar: true,
                  readOnly: true,
                  starWidth: "20px"
                })

                rateYojQuery(`#socialCard${review.id}`).rateYo({
                  rating: review.socialDistanceRating,
                  halfStar: true,
                  readOnly: true,
                  starWidth: "20px"
                })

                rateYojQuery(`#sanitationCard${review.id}`).rateYo({
                  rating: review.sanitationRating,
                  halfStar: true,
                  readOnly: true,
                  starWidth: "20px"
                })

              },500)

              document.getElementById('reviewResults').prepend(reviewElem)
            })
          })
          .catch(err => console.error(err))

      } else {

        data.forEach(business => {
          let businessElem = document.createElement('div')
          businessElem.innerHTML = `
            <div id="${business.id}" class="card business">
              <h5 class="card-header row">
                <div class="businessHead col-12 col-sm-6">
                  ${business.name} (${business.city}, ${business.state})
                </div>
                <div class="businessHead text-right col-12 col-sm-6">
                  Overall: <span id="starsListOverall${business.id}">Stars</span>
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
                      Mask Wearing: <span id="starsListMask${business.id}">Stars</span>
                    </div>
                    <div class="col-12 col-sm-4">
                      Social Distancing: <span id="starsListSocial${business.id}">Stars</span>
                    </div>
                    <div class="col-12 col-sm-4">
                      Sanitation: <span id="starsListSanitation${business.id}">Stars</span>
                    </div>
                  </div>
                </p>
                <!-- write review modal -->
                <div>
                  <button id="writeReview${business.id}" type="button" class="btn btn-custom" data-toggle="modal" data-target="#writeReviewModal${business.id}">Write Review</button>

                  <!-- Modal Window -->
                  <div class="modal fade" id="writeReviewModal${business.id}" tabindex="-1" role="dialog" aria-labelledby="writeReviewModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">

                      <!-- modal header -->
                      <div class="modal-header bg-danger">
                        <h5 class="modal-title" id="writeReview${business.id}ModalLabel">Write Review for ${business.name}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <!-- content of modal -->
                      <div class="modal-body">
                        <form>

                          <div class="form-group row">
                            <label for="username" class="col-sm-4 col-form-label">Username:</label>
                            <div class="col-sm-6">
                            <input type="text" class="form-control" id="username" placeholder="e.g. John Doe or user123">
                              <small id="userMessage" class="form-text text-muted">Choose a username that will display with your reivew.</small>
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
                            <p>Rate this business on the degree to which their employees and customers comply with the <a href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/index.html" target="_blank">prevention recommendations</a> outlined by the CDC and other local authorities.</p>
                            <small class="form-text text-muted">(1 star = poor, 5 stars = excellent)</small>

                            <div class="form-group row">
                              <label for="maskUse" class="col-sm-4 col-form-label">Mask use:</label>
                              <div class="col-sm-6">
                                <div id="maskRev${business.id}">Stars</div>
                              </div>
                            </div>

                            <div class="form-group row">
                              <label for="socialDistancing" class="col-sm-4 col-form-label">Social Distancing:</label>
                              <div class="col-sm-6">
                                <div id="socialRev${business.id}">Stars</div>
                              </div>
                            </div>

                            <div class="form-group row">
                              <label for="sanitization" class="col-sm-4 col-form-label">Sanitization:</label>
                              <div class="col-sm-6">
                              <div id="sanitizeRev${business.id}">Stars</div>
                              </div>
                            </div>

                            <div class="form-group row">
                              <label for="maskUse" class="col-sm-4 col-form-label">Overall:</label>
                              <div class="col-sm-6">
                                <div id="overallRev${business.id}">Stars</div>
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
                        <a id="${business.id}submit" class="btn btn-custom" href="#" role="button">Submit</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `

          setTimeout(() => {
            axios.get(`/api/ratings/avg-overall/${business.id}`)
              .then(({ data }) => {
                rateYojQuery(`#starsListOverall${business.id}`).rateYo({
                  rating: data[0].overall_rating,
                  halfStar: true,
                  readOnly: true,
                  starWidth: "20px"
                })
              })
              .catch(err => console.log(err))
            
            axios.get(`/api/ratings/avg-mask/${business.id}`)
              .then(({ data }) => {
                rateYojQuery(`#starsListMask${business.id}`).rateYo({
                  rating: data[0].mask_rating,
                  halfStar: true,
                  readOnly: true,
                  starWidth: "20px"
                })
              })
              .catch(err => console.log(err))
          
            axios.get(`/api/ratings/avg-social/${business.id}`)
              .then(({ data }) => {
                rateYojQuery(`#starsListSocial${business.id}`).rateYo({
                  rating: data[0].social_rating,
                  halfStar: true,
                  readOnly: true,
                  starWidth: "20px"
                })
              })
              .catch(err => console.log(err))
          
            axios.get(`/api/ratings/avg-sanitation/${business.id}`)
              .then(({ data }) => {
                rateYojQuery(`#starsListSanitation${business.id}`).rateYo({
                  rating: data[0].sanitation_rating,
                  halfStar: true,
                  readOnly: true,
                  starWidth: "20px"
                })
              })
              .catch(err => console.log(err))            

            rateYojQuery(`#overallRev${business.id}`).rateYo({
              rating: 1.5,
              halfStar: true,
              
              starWidth: "20px"
            })
          
            rateYojQuery(`#maskRev${business.id}`).rateYo({
              rating: 1.5,
              halfStar: true,
            
              starWidth: "20px"
            })
          
            rateYojQuery(`#socialRev${business.id}`).rateYo({
              rating: 1.5,
              halfStar: true,
              
              starWidth: "20px"
            })
          
            rateYojQuery(`#sanitizeRev${business.id}`).rateYo({
              rating: 1.5,
              halfStar: true,
              
              starWidth: "20px"
            })
          }, 500)
          document.getElementById('searchResults').prepend(businessElem)
        })
      }
    })
    .catch(err => console.error(err))

})

// include jquery cdn and css