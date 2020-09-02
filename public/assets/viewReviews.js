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



})

// include jquery cdn and css