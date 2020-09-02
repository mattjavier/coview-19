document.getElementById('createUser').addEventListener('click', event => {

  axios.post('/api/users', {
    username: document.getElementById('createUsername').value,
    password: document.getElementById('createPassword').value
  })
    .then(() => {
      document.getElementById('modalBody').innerHTML = ''
      document.getElementById('modalBody').innerHTML = `
        <div id="successBox" class="container text-secondary">
          <p>Your login information was saved. Please click the close button and sign in.</p>
        </div>
      `
      document.getElementById('modalFooter').innerHTML = ''
      document.getElementById('modalFooter').innerHTML = `
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      `
    })
    .catch(err => console.log(err))
})

document.getElementById('signIn').addEventListener('click', event => {
  axios.post('/api/users/login', {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  })
    .then(user => {
      console.log(user)
      if (user !== null) {
        window.location.replace('/login')
      }
      window.location.replace('/home')
    })
    .catch(err => console.log(err))
})