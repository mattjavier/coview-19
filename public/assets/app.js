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

const login = (username, password) => {
  axios.post('/api/users/login', {
    username: username,
    password: password
  })
    .then(user => {
      if (user !== null) {
        window.location.replace('/home')
      } else {
        window.location.replace('/')
      }
    })
    .catch(err => console.log(err))
}

document.getElementById('signIn').addEventListener('click', event => {
  if (!document.getElementById('username').value || !document.getElementById('password')) {
    return
  }

  login(document.getElementById('username').value, document.getElementById('password').value)
  document.getElementById('username').value = ''
  document.getElementById('password').value = ''
})