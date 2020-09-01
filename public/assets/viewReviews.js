$(document).ready(function() {
  $.ajax('/api/businesses')
    .then(businesses => {
      businesses = businesses.map(business => business.name)

      $('#businessName').autocomplete({
        source: businesses
      })
    })
})

// include jquery cdn and css