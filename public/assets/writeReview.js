$(document).ready(function() {

  // $('#businessType').click(function() {
  //   $.ajax('api/businesses/types')
  //     .then(({ data }) => {
  //       data.forEach(type => {

  //       })
  //     })
  // })

  $("#mask").rateYo({
    rating: 1.5,
    halfStar: true
  })

  $("#social").rateYo({
    rating: 1.5,
    halfStar: true
  })

  $("#sanitation").rateYo({
    rating: 1.5,
    halfStar: true
  })

  $("#overall").rateYo({
    rating: 1.5,
    halfStar: true
  })

  $('#submit').click(function() {
    let maskRating = $('#mask').rateYo().rateYo('rating')
    let socialRating = $('#social').rateYo().rateYo('rating')
    let sanitationRating = $('#sanitation').rateYo().rateYo('rating')
    let overallRating = $('#overall').rateYo().rateYo('rating')
    console.log(maskRating, socialRating, sanitationRating, overallRating)

    // $.post('/api/ratings', { name, type, overallRating, maskRating, sanitationRating, socialRating, comment, userId, businessId  })
  })
})

