$(document).ready(function () {
  $.ajax('/api/businesses')
    .then(businesses => {
      businesses = businesses.map(business => business.name)

      $('#businessName').autocomplete({
        source: businesses
      })
    })
})

// // city autocompleter
// axios.get('/api/business-locations')
//   .then(({ data }) => {
//     data = data.map(location => location.city)
//     autojQuery('#city').autocomplete({
//       source: data
//     })
//   })
//   .catch(err => console.log(err))

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

document.getElementById('srcBusiness').addEventListener('click', event => {
  event.preventDefault()
  document.getElementById('noResults').classList.add('d-none')
  document.getElementById('searchResults').innerHTML = ''
  document.getElementById('reviewResults').innerHTML = ''

  let name = document.getElementById('businessName').value

  let type = document.getElementById('typeSrc').options[document.getElementById('typeSrc').selectedIndex].value

  let city = document.getElementById('citySrc').value

  let state = document.getElementById('stateSrc').options[document.getElementById('stateSrc').selectedIndex].value

  console.log(name, type, city, state)
  let search = ''

  if (name !== '') {
    search = '/' + name
  }

  if (type !== '') {
    search = search + '/' + type
  }

  if (city !== '') {
    search = search + '/' + city
  }

  if (state !== '') {
    search = search + '/' + state
  }

  console.log(search)
  let businessId = ''
  var reviewed = []
  // generic search handler
  axios.get('api/businesses' + search)
    .then(({ data }) => {
      console.log(data)
      if (data.length === 0) {
        console.log('empty')
        document.getElementById('noResults').classList.remove('d-none')
      } else {

        data.forEach(business => {
          console.log(business.ratings.length)
          if (business.ratings.length > 0) {
            reviewed.push(business)
            console.log(reviewed)
          }
        })
      }
    })
    .catch(err => console.error(err))

  console.log(reviewed, reviewed.length)
  console.log(reviewed[0])
  console.log(reviewed[0].name)


  if (reviewed.length === 1) {
    // renders business summary card
    console.log('hi')

    businessId = `${reviewed[0].id}`
    let businessElem = document.createElement('div')
    businessElem.innerHTML = `
       <div id="${reviewed[0].id}" class="card business">
      <h5 class="card-header row">
        <div class="businessHead col-12 col-sm-6">
          ${reviewed[0].name} (${reviewed[0].city}, ${reviewed[0].state})
        </div>
        <div class="businessHead text-right col-12 col-sm-6">Overall:
          <span class="stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i
              class="fas fa-star-half-alt"></i><i class="far fa-star"></i></span>
        </div>
      </h5>
      <div class="card-body">
        <div class="row">
          <div class="col-6">
            <h5 class="card-title">${reviewed[0].type}</h5>
          </div>
          <div class="col-6 text-right">
            <p class="card-title">Reviews: ${reviewed[0].ratings.length}</p>
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
                <!-- write review modal -->
        <div>
          <button id="writeReview${reviewed[0].id}" type="button" class="btn btn-custom" data-toggle="modal" data-target="#writeReviewModal${reviewed[0].id}">
            Write Review
          </button>

          <!-- Modal Window -->
          <div class="modal fade" id="writeReviewModal${reviewed[0].id}" tabindex="-1" role="dialog"
            aria-labelledby="writeReviewModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">

                <!-- modal header -->
                <div class="modal-header bg-danger">
                  <h5 class="modal-title" id="writeReview${reviewed[0].id}ModalLabel">Write Review for ${reviewed[0].name}</h5>
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
                        <small id="userMessage" class="form-text text-muted">Choose a username that will display with
                          your reivew.</small>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label for="${reviewed[0].id}businessName" class="col-sm-4 col-form-label">Business Name:</label>
                      <div class="col-sm-6">
                        <input type="text" class="form-control" id="${reviewed[0].id}businessName" value="${reviewed[0].name}">
                      </div>
                    </div>

                    <div class="form-group row">
                      <label for="${reviewed[0].id}businessType" class="col-sm-4 col-form-label">Business Type:</label>
                      <div class="col-sm-6">
                        <!-- populate this list with some seeded business types. Include an "other" option perhaps? -->
                        <select class="form-control" id="${reviewed[0].id}businessType">
                          <option value="${reviewed[0].type}" selected>${reviewed[0].type}</option>
                        </select>
                      </div>
                    </div>
                    <div>

                      <p>Where is this business located?</p>

                      <div class="form-group row">
                        <label for="${reviewed[0].id}city" class="col-sm-4 col-form-label">City:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" id="${reviewed[0].id}city" value="${reviewed[0].city}">
                        </div>
                      </div>

                      <div class="form-group row">
                        <label for="${reviewed[0].id}state" class="col-sm-4 col-form-label">State:</label>
                        <div class="col-sm-6">
                          <select class="form-control" id="${reviewed[0].id}state">
                            <option value="${reviewed[0].state}">${reviewed[0].state}</option>
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
                        <label for="${reviewed[0].id}maskUse" class="col-sm-4 col-form-label">Mask use:</label>
                        <div class="col-sm-6">
                          <select class="form-control" id="${reviewed[0].id}maskUse">
                            <option selected>Choose...(these will be stars later)</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label for="${reviewed[0].id}socialDistancing" class="col-sm-4 col-form-label">Social Distancing:</label>
                        <div class="col-sm-6">
                          <select class="form-control" id="${reviewed[0].id}socialDistancing">
                            <option selected>Choose...(these will be stars later)</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label for="${reviewed[0].id}sanitization" class="col-sm-4 col-form-label">Sanitization:</label>
                        <div class="col-sm-6">
                          <select class="form-control" id="${reviewed[0].id}sanitization">
                            <option selected>Choose...(these will be stars later)</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label for="${reviewed[0].id}maskUse" class="col-sm-4 col-form-label">Overall:</label>
                        <div class="col-sm-6">
                          <select class="form-control" id="${reviewed[0].id}maskUse">
                            <option selected>Choose...(these will be stars later)</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                        </div>
                      </div>

                    </div>

                    <div class="form-group row">
                      <label for="${reviewed[0].id}comments" class="col-sm-4 col-form-label">Comments:</label>
                      <div class="col-sm-8">
                        <textarea class="form-control" id="${reviewed[0].id}comments" rows="3"
                          placeholder="Enter comment here."></textarea>
                      </div>
                    </div>
                  </form>
                </div>

                <div class="modal-footer">
                  <!-- close button -->
                  <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                  <!-- create log in button -->
                  <a id="${reviewed[0].id}submit" class="btn btn-custom" href="#" role="button">Submit</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
        `
    document.getElementById('searchResults').prepend(businessElem)


    // renders cards for individual reviews
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
          <h5 class="card-title">Overall: <span class="stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i
                class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i></span></h5>
          <hr class="border-danger">
          <p class="card-text">Mask Wearing:<br><span class="stars"><i class="fas fa-star"></i><i
                class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i
                class="far fa-star"></i></span></p>
          <p class="card-text">Social Distancing:<br><span class="stars"><i class="fas fa-star"></i><i
                class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i
                class="far fa-star"></i></span></p>
          <p class="card-text">Sanitation:<br><span class="stars"><i class="fas fa-star"></i><i
                class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i
                class="far fa-star"></i></span></p>
          <hr class="border-danger">
          <p class="card-text">${review.comment}</p>
        </div>
        <div class="card-footer">
          <small class="text-muted">Created on ${review.createdAt}.</small>
        </div>
      </div>
              `
          document.getElementById('reviewResults').prepend(reviewElem)
        })
      })
      .catch(err => console.error(err))
  }
  else {
    for (let i = 0; i < reviewed.length; i++) {
      // renders business summary card for each business

      let businessElem = document.createElement('div')
      businessElem.innerHTML = `
        <div id="${reviewed[i].id}" class="card business">
      <h5 class="card-header row">
        <div class="businessHead col-12 col-sm-6">
          ${reviewed[i].name} (${reviewed[i].city}, ${reviewed[i].state})
        </div>
        <div class="businessHead text-right col-12 col-sm-6">Overall:
          <span class="stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i
              class="fas fa-star-half-alt"></i><i class="far fa-star"></i></span>
        </div>
      </h5>
      <div class="card-body">
        <div class="row">
          <div class="col-6">
            <h5 class="card-title">${reviewed[i].type}</h5>
          </div>
          <div class="col-6 text-right">
            <p class="card-title">Reviews: ${reviewed[i].ratings.length}</p>
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
                <!-- write review modal -->
        <div>
          <button id="writeReview${reviewed[i].id}" type="button" class="btn btn-custom" data-toggle="modal" data-target="#writeReviewModal${reviewed[i].id}">
            Write Review
          </button>

          <!-- Modal Window -->
          <div class="modal fade" id="writeReviewModal${reviewed[i].id}" tabindex="-1" role="dialog"
            aria-labelledby="writeReviewModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">

                <!-- modal header -->
                <div class="modal-header bg-danger">
                  <h5 class="modal-title" id="writeReview${reviewed[i].id}ModalLabel">Write Review for ${reviewed[i].name}</h5>
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
                        <small id="userMessage" class="form-text text-muted">Choose a username that will display with
                          your reivew.</small>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label for="${reviewed[i].id}businessName" class="col-sm-4 col-form-label">Business Name:</label>
                      <div class="col-sm-6">
                        <input type="text" class="form-control" id="${reviewed[i].id}businessName" value="${reviewed[i].name}">
                      </div>
                    </div>

                    <div class="form-group row">
                      <label for="businessType" class="col-sm-4 col-form-label">Business Type:</label>
                      <div class="col-sm-6">
                        <!-- populate this list with some seeded business types. Include an "other" option perhaps? -->
                        <select class="form-control" id="${reviewed[i].id}businessType">
                          <option value="${reviewed[i].type}" selected>${reviewed[i].type}</option>
                        </select>
                      </div>
                    </div>
                    <div>

                      <p>Where is this business located?</p>

                      <div class="form-group row">
                        <label for="city" class="col-sm-4 col-form-label">City:</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" id="${reviewed[i].id}city" value="${reviewed[i].city}">
                        </div>
                      </div>

                      <div class="form-group row">
                        <label for="state" class="col-sm-4 col-form-label">State:</label>
                        <div class="col-sm-6">
                          <select class="form-control" id="${reviewed[i].id}state">
                            <option value="${reviewed[i].state}">${reviewed[i].state}</option>
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
                        <label for="maskUse" class="col-sm-4 col-form-label">Mask use:</label>
                        <div class="col-sm-6">
                          <select class="form-control" id="${reviewed[i].id}maskUse">
                            <option selected>Choose...(these will be stars later)</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label for="socialDistancing" class="col-sm-4 col-form-label">Social Distancing:</label>
                        <div class="col-sm-6">
                          <select class="form-control" id="${reviewed[i].id}socialDistancing">
                            <option selected>Choose...(these will be stars later)</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label for="sanitization" class="col-sm-4 col-form-label">Sanitization:</label>
                        <div class="col-sm-6">
                          <select class="form-control" id="${reviewed[i].id}sanitization">
                            <option selected>Choose...(these will be stars later)</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label for="maskUse" class="col-sm-4 col-form-label">Overall:</label>
                        <div class="col-sm-6">
                          <select class="form-control" id="${reviewed[i].id}maskUse">
                            <option selected>Choose...(these will be stars later)</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                        </div>
                      </div>

                    </div>

                    <div class="form-group row">
                      <label for="comments" class="col-sm-4 col-form-label">Comments:</label>
                      <div class="col-sm-8">
                        <textarea class="form-control" id="${reviewed[i].id}comments" rows="3"
                          placeholder="Enter comment here."></textarea>
                      </div>
                    </div>
                  </form>
                </div>

                <div class="modal-footer">
                  <!-- close button -->
                  <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                  <!-- create log in button -->
                  <a id="${reviewed[i].id}submit" class="btn btn-custom" href="#" role="button">Submit</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
              `
      document.getElementById('searchResults').prepend(businessElem)

    }
  }





})

// include jquery cdn and css